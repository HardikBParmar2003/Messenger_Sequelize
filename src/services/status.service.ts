import { stat } from "fs/promises";
import { Status } from "../models";
import { statusRepository } from "../repositories/status.repository";
import { string } from "joi";

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
      throw new Error("Error while uploading status");
    }
  },

  async deleteStatus(user_id: number, status_id: number) {
    try {
      const status: Status | null = await statusRepository.getStatus(status_id);
      if (status) {
        return await statusRepository.deleteStatus(user_id, status_id);
      }
      return false;
    } catch (error) {
      throw new Error("Error while deleting status");
    }
  },

  async getUserStatus(user_id: number) {
    try {
      return await statusRepository.getUserStatus(user_id);
    } catch (error) {
      throw new Error("Error while fetching user status");
    }
  },

  async getAllStatus(user_id: number) {
    try {
      return await statusRepository.getAllStatus(user_id);
    } catch (error) {
      throw new Error("Error while fetching all user status");
    }
  },

  async searchStatus(user_id: number, value: string) {
    try {
      return await statusRepository.searchStatus(user_id, value);
    } catch (error) {
      throw new Error("Error while fetching all user status");
    }
  },
};
