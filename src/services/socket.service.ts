import { Chat } from "../models";
import { socketRepository } from "../repositories/socket.repository";

export const socketService = {
  async addMessage(
    sender_id: number,
    receiver_id: number,
    message: string,
    group_id: number
  ) {
    try {
      if (!group_id) {
        const data = {
          sender_id,
          receiver_id,
          message,
        };
        return await socketRepository.addMessage(data as Chat);
      } else {
        const data = {
          sender_id,
          group_id,
          message,
        };
        return await socketRepository.addMessage(data as Chat);
      }
    } catch (error) {
      throw new Error("error");
    }
  },
};
