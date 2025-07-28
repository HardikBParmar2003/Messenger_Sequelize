import { userMiddleware } from "../middleware/user.middleware";
import { Group, User } from "../models";
import { socketService } from "../services/socket.service";
export default function socketTest(ioe: any) {
  const socketIdMap = new Map<number, string>();
  ioe.use((socket: any, next: any) => {
    try {
      const user = userMiddleware.getUserIdFromSocket(socket);

      if (!user) {
        return next(new Error("Authentication error: user not found"));
      }

      socket.data.user = user; 
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  ioe.on("connection", async (socket: any) => {
    const user: User = socket.data.user;

    socketIdMap.set(user.user_id, socket.id);
    socket.on("joinGroups", (groupIds: number[]) => {
      groupIds.forEach((group_id) => {
        socket.join(String(group_id));
      });
    });

    socket.on(
      "send message",
      async (sender_id: number, receiver_id: number, message: string,sender:string) => {
        const group_id = 0;
        const chatData = await socketService.addMessage(
          sender_id,
          receiver_id,
          message,
          group_id
        );
        ioe.emit("send message back", chatData,sender);
      }
    );

    socket.on(
      "send group message",
      async (sender_id: number, group_id: number, message: string,sender_name:string,group_name:string) => {
        const receiver_id = 0;
        const chatData = await socketService.addMessage(
          sender_id,
          receiver_id,
          message,
          group_id
        );
        ioe.to(String(group_id)).emit("send group message back", chatData,sender_name,group_name);
      }
    );

    socket.on(
      "add member to group",
      async (member_id: number, group_id: number,admin_name:string) => {
        const socketIdF = socketIdMap.get(Number(member_id));
        if (socketIdF) {
          ioe.to(socketIdF).emit("add member to group back", group_id,admin_name);
        }
      }
    );

    socket.on("remove member", (member_id: number, group_id: number,group_name:string) => {
      const socketIdF = socketIdMap.get(Number(member_id));
      if (socketIdF) {
        ioe.to(socketIdF).emit("remove member back", group_id,member_id,group_name);
      }
    });

    socket.on("update group", (group_id: number, group: Group) => {
      ioe.to(String(group_id)).emit("update group back", group);
    });

    socket.on("disconnect", () => {
      const socketDisconnect = socketIdMap.get(user.user_id);
      if (socketDisconnect) {
        socketIdMap.delete(user.user_id);
      }
    });
  });
}
