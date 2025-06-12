import { any } from "joi";
import { Group } from "../models";
import { groupRepository } from "../repositories/group.repositories";

export const groupService = {
  async createGroup(id: number, name: string) {
    try {
      const data = {
        user_id: id,
        group_name: name,
      };
      return await groupRepository.createGroup(data as Group);
    } catch (error) {
      throw error;
    }
  },

  async addUser(group_id:number,member_id:number,admin_id:number){
    try {
      
    } catch (error) {
      throw error
      
    }
  }
};
