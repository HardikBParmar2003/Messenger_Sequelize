import { date } from "joi";
import { Group, Member } from "../models";
import { groupRepository } from "../repositories/group.repositories";
import { memberRepository } from "../repositories/member.repositories";

interface updateGroup{
    group_name:string
}

export const groupService = {

  async createGroup(user_id: number, name: string) {
    try {
      const data = {
        user_id: user_id,
        group_name: name,
      };
      const groupData = await groupRepository.createGroup(data as Group);
      if (groupData) {
        const group_id: number = groupData.toJSON().group_id;
        const user_id: number = groupData.toJSON().user_id;
        const data = {
          group_id,
          admin_id: user_id,
          user_id,
        };
        const addUser = await memberRepository.addUser(data as Member);
        if (addUser) {
          return addUser;
        } else {
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  },

  async getGroups(user_id: number) {
    try {
      return await groupRepository.getGroups(user_id);
    } catch (error) {
      throw new Error("Error while fetching group data");
    }
  },

  async updateGroupData(data:updateGroup,file:string,group_id : string){
    try {
      const groupData = {
        group_name:data?.group_name,
        profile_photo:file
      }
      const id:number = Number(group_id)
      return await groupRepository.updateGroupData(groupData as unknown as Group,id)
    } catch (error) {
      throw new Error("Error while upating group data")
      
    }
  }


};
