import { socketService } from "../services/socket.service";
export default function socketTest(ioe: any) {
  ioe.on("connection", (socket: any) => {
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
  });
}
