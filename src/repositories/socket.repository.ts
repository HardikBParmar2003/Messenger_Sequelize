import { Chat, User } from "../models";

export const socketRepository = {
  async addMessage(data: Chat) {
    try {
      const group_id: number = data.group_id;
      if (group_id) {
        const msgData = await Chat.create(data);
        const messageId = msgData.id;
        const userData = await Chat.findOne({
          where: { id: messageId },
          attributes: ["message", "createdAt", "group_id"],

          include: [
            {
              model: User,
              as: "sender",
              attributes: [
                "user_id",
                "first_name",
                "last_name",
                "profile_photo",
              ],
            },
          ],
        });
        return userData;
      } else {
        return await Chat.create(data);

      }
    } catch (error) {
      throw new Error("Error");
    }
  },
};
