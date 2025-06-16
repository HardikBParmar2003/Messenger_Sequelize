import { Op } from "sequelize";
import { Status } from "../models/status.model";

export const statusRepository = {
  async uploadStatus(data: Status) {
    try {
      return await Status.create(data);
    } catch (error) {
        console.log("error",error);

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
};
