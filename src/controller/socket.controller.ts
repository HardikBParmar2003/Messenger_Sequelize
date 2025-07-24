import { userMiddleware } from "../middleware/user.middleware";
import { Group, User } from "../models";
import { socketService } from "../services/socket.service";
export default function socketTest(ioe: any) {
  const socketIdMap = new Map<number, string>();
  ioe.on("connection", async (socket: any) => {
    const user: User | undefined = userMiddleware.getUserIdFromSocket(socket);

    socketIdMap.set(user!.user_id, socket.id);
    socket.on("joinGroups", (groupIds: number[]) => {
      groupIds.forEach((group_id) => {
        socket.join(String(group_id));
      });
    });

    socket.on(
      "send message",
      async (sender_id: number, receiver_id: number, message: string) => {
        const group_id = 0;
        const chatData = await socketService.addMessage(
          sender_id,
          receiver_id,
          message,
          group_id
        );
        ioe.emit("send message back", chatData);
      }
    );

    socket.on(
      "send group message",
      async (sender_id: number, group_id: number, message: string) => {
        const receiver_id = 0;
        const chatData = await socketService.addMessage(
          sender_id,
          receiver_id,
          message,
          group_id
        );
        ioe.to(String(group_id)).emit("send group message back", chatData);
      }
    );

    socket.on(
      "add member to group",
      async (member_id: number, group_id: number) => {
        const socketIdF = socketIdMap.get(Number(member_id));
        if (socketIdF) {
          ioe.to(socketIdF).emit("add member to group back", group_id);
        }
      }
    );

    socket.on("remove member", (member_id: number, group_id: number) => {
      const socketId = socketIdMap.get(Number(member_id));
      if (socketId) {
        ioe.to(socketId).emit("remove member back", group_id);
      }
    });

    socket.on("update group", (group_id: number, group: Group) => {
      ioe.to(String(group_id)).emit("update group back", group);
    });

    socket.on("disconnect", () => {
      const socketDisconnect = socketIdMap.get(user!.user_id);
      if (socketDisconnect) {
        socketIdMap.delete(user!.user_id);
      }
    });
  });
}
