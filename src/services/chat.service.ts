import { Chat, User } from "../models";
import { chatRepository } from "../repositories/chat.repoitories";

export const chatService = {

  async addPersonalChat(
    sender_id: number,
    receiver_id: number,
    message: string
  ) {
    try {
      const data = {
        sender_id: sender_id,
        receiver_id: receiver_id,
        message: message,
      };
      return await chatRepository.addPersonalChat(data as Chat);
    } catch (error) {
      throw new Error("Error in chat service while inserting  personal chat");
    }
  },

  async addGroupChat(sender_id: number, group_id: number, message: string) {
    try {
      const data = {
        sender_id: sender_id,
        group_id: group_id,
        message: message,
      };
      return await chatRepository.addPersonalChat(data as Chat);
    } catch (error) {
      throw new Error("Error in chat service while inserting  personal chat");
    }
  },

  async getUserChat(admin_id: number, user_id: number) {
    try {
      return await chatRepository.getUserChat(admin_id, user_id);
    } catch (error) {
      throw new Error("Error while fetching chat data");
    }
  },

  async getAllChattingUser(user_id: number) {
    try {
      const data = await chatRepository.getAllChattingUser(user_id);
      // const uniqueUser:Map<number,User> = new Map();
      // data.forEach((chat) => {
      //   const otherUserData =
      //     chat.sender.user_id === user_id ? chat.receiver : chat.sender;
      //   if (
      //     otherUserData.user_id != user_id &&
      //     !uniqueUser.has(otherUserData.user_id)
      //   ) {
      //     uniqueUser.set(otherUserData.user_id, otherUserData);
      //   }
      // });
      // return Array.from(uniqueUser.values());
      return data
    } catch (error) {
      throw new Error("Error while fetching chat user data");
    }
  },
  
};
