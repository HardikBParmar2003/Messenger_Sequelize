import { sequelize } from "../config/database"; // ✅ Sequelize instance
import { QueryTypes } from "sequelize";
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
          group_id:null as any
          ,
          [Op.or]: [
            { [Op.and]: [{ sender_id: admin_id }, { receiver_id: user_id }] },
            { [Op.and]: [{ sender_id: user_id }, { receiver_id: admin_id }] },
          ],
        },

        attributes: {
          exclude: ["id", "updatedAt", "group_id"],
        },
        order: [["createdAt", "ASC"]],
      });
    } catch (error) {
      throw new Error("Error while fetching chat data");
    }
  },

    // async getAllChattingUser(user_id: number) {
    //   try {
    //     const data = await Chat.findAll({
    //       where: {
    //         group_id: {
    //           [Op.is]: literal("NULL"),
    //         },
    //         [Op.or]: [{ sender_id: user_id }, { receiver_id: user_id }],
    //       },
    //       attributes: [],
    //       include: [
    //         {
    //           model: User,
    //           as: "sender",
    //           attributes: {
    //             exclude: ["createdAt", "updatedAt", "password", "email"],
    //           },
    //         },
    //         {
    //           model: User,
    //           as: "receiver",
    //           attributes: {
    //             exclude: ["createdAt", "updatedAt", "password", "email"],
    //           },
    //         },
    //       ],
    //     });
    //     return data;
    //   } catch (error) {
    //     throw new Error("Error while fetching chat user data");
    //   }
    // },
  

  // async getAllChattingUser(user_id: number) {
  //   try {
  //     const [results] = await sequelize.query(
  //       `
  //       SELECT
  //         u.id, u.name, u.username, u.avatar, -- select only needed user fields
  //         MAX(c."createdAt") as "lastMessageAt"
  //       FROM "Chats" c
  //       JOIN "Users" u
  //         ON u.id = CASE
  //           WHEN c.sender_id = :userId THEN c.receiver_id
  //           ELSE c.sender_id
  //         END
  //       WHERE
  //         (c.sender_id = :userId OR c.receiver_id = :userId)
  //         AND c.group_id IS NULL
  //       GROUP BY u.id, u.name, u.username, u.avatar
  //       ORDER BY "lastMessageAt" DESC;
  //       `,
  //       {
  //         replacements: { userId: user_id },
  //         type: sequelize.QueryTypes.SELECT,
  //       }
  //     );

  //     return results;
  //   } catch (error) {
  //     throw new Error("Error while fetching chat user data");
  //   }
  // }
  // ✅ QueryTypes from sequelize

  async getAllChattingUser(user_id: number) {
    try {
      const results = await sequelize.query(
        `
      SELECT 
        u.user_id, u.first_name, u.last_name, u.profile_photo,
        MAX(c."createdAt") AS "lastMessageAt"
      FROM "chat_table" c
      JOIN "users" u 
        ON u.user_id = CASE 
          WHEN c.sender_id = :userId THEN c.receiver_id 
          ELSE c.sender_id 
        END
      WHERE 
        (c.sender_id = :userId OR c.receiver_id = :userId)
        AND c.group_id IS NULL
      GROUP BY u.user_id, u.first_name, u.last_name, u.profile_photo
      ORDER BY "lastMessageAt" DESC;
      `,
        {
          replacements: { userId: user_id },
          type: QueryTypes.SELECT,
        }
      );

      return results;
    } catch (error) {
      throw new Error("Error while fetching chat user data");
    }
  },
};
