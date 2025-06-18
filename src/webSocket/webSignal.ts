import { Server as WebSocketServer, WebSocket } from "ws";
import http from "http";
import { Request } from "express";

const onlineUser = new Map<number, WebSocket>();

export const callWebSocket = {
  async webSocketSetup(server: http.Server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws: WebSocket, req: Request) => {
      const user_id: number = req.user?.user_id as number;
      if (!user_id) {
        ws.close();
        return;
      }
      console.log("ws is : ", ws);
      console.log("user id is:", user_id);
      onlineUser.set(user_id, ws);

      ws.on("message", (msg) => {
        try {
          const data = JSON.parse(msg.toString());
          if (data.to && onlineUser.has(data.to)) {
            onlineUser.get(data.to)?.send(JSON.stringify(data));
          }
        } catch (error) {
          throw new Error("Invalid wss message");
        }
      });
      ws.on("close", () => {
        onlineUser.delete(user_id);
        console.log(`User ${user_id} disconnected`);
      });
    });
  },

  async notifyIncomingCall(receiver_id: number, calle_namer: string) {
    const ws = onlineUser.get(receiver_id);
    if (ws) {
      ws.send(JSON.stringify({ type: "incoming_call", from: calle_namer }));
      return true;
    }
    return false;
  },

  async notifyCallEnded(toUserId: number, user_name: string) {
    const ws = onlineUser.get(toUserId);
    console.log("ro user", toUserId, user_name);
    console.log("Ws is", ws);
    if (ws) {
      ws.send(JSON.stringify({ type: "call_ended", from: user_name }));
      return true;
    }
    return false;
  },
};
