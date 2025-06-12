import { any } from "joi";
import { Group, Member } from "../models";
import { groupRepository } from "../repositories/group.repositories";

export const groupService = {
  async createGroup(user_id: number, name: string) {
    try {
      const data = {
        user_id: user_id,
        group_name: name,
      };
      return await groupRepository.createGroup(data as Group);
    } catch (error) {
      throw error;
    }
  },

  
};
