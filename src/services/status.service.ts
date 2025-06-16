import { Status } from "../models";
import { statusRepository } from "../repositories/status.repository";

export const statusService = {
  async uploadStatus(description: string, status: string, user_id: number) {
    try {
      const data = {
        user_id,
        status,
        description,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };
      return await statusRepository.uploadStatus(data as Status);
    } catch (error) {
        console.log("error",error);
      throw new Error("Error while uploading status");
    }
  },

  async deleteStatus(user_id: number, status_id: number) {
    try {
      return await statusRepository.deleteStatus(user_id, status_id);
    } catch (error) {
      throw new Error("Error while deleting status");
    }
  },
};
