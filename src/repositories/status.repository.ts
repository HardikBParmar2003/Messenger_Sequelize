import { Op,QueryTypes } from "sequelize";
import { Status } from "../models/status.model";
import { any } from "joi";
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
      return await sequelize.query(
        "SELECT * FROM `status_table` WHERE user_id in (SELECT receiver_id from chat_table WHERE sender_id = ? and receiver_id is NOT NULL UNION SELECT sender_id from chat_table WHERE receiver_id = ? and receiver_id is NOT NULL) and expiresAt > ?",
        {
          replacements: [user_id, user_id, now],
          type:QueryTypes.SELECT
        }
      );
    } catch (error) {
      throw new Error("Error while fetching all user status");
    }
  },
};
