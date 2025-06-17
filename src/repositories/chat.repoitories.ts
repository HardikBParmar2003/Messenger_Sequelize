import { Chat, User } from "../models";
import { literal, Op } from "sequelize";

export const chatRepository = {
  
  async addPersonalChat(data: Chat) {
    try {
      return await Chat.create(data);
    } catch (error) {
      throw new Error(
        "Error in chat repository while inserting  personal chat"
      );
    }
  },

  async getUserChat(admin_id: number, user_id: number) {
    try {
      return await Chat.findAll({
        where: {
          [Op.or]: [
            { [Op.and]: [{ sender_id: admin_id }, { receiver_id: user_id }] },
            { [Op.and]: [{ sender_id: user_id }, { receiver_id: admin_id }] },
          ],
          
        },

        attributes: {
          exclude: ["id", "updatedAt", "group_id"],
        },
        order: [['createdAt', 'ASC']],
      });
    } catch (error) {
      throw new Error("Error while fetching chat data");
    }
  },

  async getAllChattingUser(user_id: number) {
    try {
      const data = await Chat.findAll({
        where: {
          group_id: {
            [Op.is]: literal("NULL"),
          },
          [Op.or]: [{ sender_id: user_id }, { receiver_id: user_id }],
        },
        attributes: [],
        include: [
          {
            model: User,
            as: "sender",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "email"],
            },
          },
          {
            model: User,
            as: "receiver",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "email"],
            },
          },
        ],
      });
      return data;
    } catch (error) {
      throw new Error("Error while fetching chat user data");
    }
  },
  
};
