import { Op, QueryTypes } from "sequelize";
import { Status } from "../models/status.model";
import { sequelize } from "../config/database";

export const statusRepository = {
  async uploadStatus(data: Status) {
    try {
      return await Status.create(data);
    } catch (error) {
      throw new Error("Error while uploading status");
    }
  },
  async deleteStatus(user_id: number, status_id: number) {
    try {
      return await Status.destroy({
        where: {
          status_id,
          user_id,
        },
      });
    } catch (error) {
      throw new Error("Error while deleting status");
    }
  },

  async expiredStatusDelete() {
    try {
      const now = new Date();
      await Status.destroy({
        where: {
          expiresAt: {
            [Op.lt]: now,
          },
        },
      });
    } catch (error) {
      throw new Error("Error while auto delete status using cron");
    }
  },

  async getUserStatus(user_id: number) {
    try {
      const now = new Date();

      return await Status.findAll({
        where: {
          user_id,
          expiresAt: {
            [Op.gt]: now,
          },
        },
        attributes: {
          exclude: ["updatedAt", "expiresAt"],
        },
      });
    } catch (error) {
      throw new Error("Error while fetching user status");
    }
  },

  async getAllStatus(user_id: number) {
    try {
      const now = new Date();
      const query = await sequelize.query(
        `SELECT * FROM status_table WHERE user_id in (SELECT receiver_id from chat_table WHERE sender_id = ? and receiver_id is NOT NULL UNION SELECT sender_id from chat_table WHERE receiver_id = ? and receiver_id is NOT NULL) and "expiresAt" > ?`,

        {
          replacements: [user_id, user_id, now],
          type: QueryTypes.SELECT,
        }
      );
      return query;
    } catch (error) {
      throw new Error("Error while fetching all user status");
    }
  },

  async searchStatus(user_id: number, value: string) {
    try {
      const now = new Date();
      const query = await sequelize.query(
        `SELECT user_id,first_name,last_name,profile_photo FROM users WHERE user_id in (SELECT user_id FROM status_table WHERE user_id in (SELECT receiver_id FROM chat_table WHERE sender_id = ? AND receiver_id is NOT NULL UNION SELECT sender_id FROM chat_table WHERE receiver_id = ? AND sender_id is NOT NULL) AND "expiresAt" > ?) AND (first_name iLike ? or last_name iLike ? )`,

        {
          replacements: [user_id, user_id, now, `%${value}%`,`%${value}%`],
          type: QueryTypes.SELECT,
        }
      );
      return query;
    } catch (error) {
      throw new Error("Error while fetching all user status");
    }
  },

  async getStatus(status_id: number) {
    try {
      return await Status.findByPk(status_id);
    } catch (error) {
      throw new Error("Error while fetching status");
    }
  },
};
