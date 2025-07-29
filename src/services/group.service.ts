import { Group, Member } from "../models";
import { groupRepository } from "../repositories/group.repositories";
import { memberRepository } from "../repositories/member.repositories";
import { sequelize } from "../config/database";

interface updateGroup {
  group_name: string;
}

export const groupService = {
  async createGroup(user_id: number, name: string) {
    const t = await sequelize.transaction();
    try {
      const data = {
        user_id: user_id,
        group_name: name,
        profile_photo : "https://res.cloudinary.com/duy1xfupo/image/upload/v1753350752/hardik/iot39ag5m2akuqqa3ivd.png"
      };
      const groupData: Group = await groupRepository.createGroup(
        data as Group,
        { transaction: t }
      );
      if (groupData) {
        const group_id: number = groupData.toJSON().group_id;
        const user_id: number = groupData.toJSON().user_id;
        const data = {
          group_id,
          admin_id: user_id,
          user_id,
          role_id: 1,
        };
        const addUser = await memberRepository.addUser(data as Member, {
          transaction: t,
        });
        if (addUser) {
          await t.commit();
          return groupData;
        } else {
          return false;
        }
      } else {
        await t.rollback();
        return false;
      }
    } catch (error) {
      await t.rollback();
      throw new Error("Error while creating group");
    }
  },

  async getGroups(user_id: number) {
    try {
      return await groupRepository.getGroups(user_id);
    } catch (error) {
      throw new Error("Error while fetching group data");
    }
  },

  async updateGroupData(
    group_name: updateGroup,
    file: string,
    group_id: string
  ) {
    try {
      const groupData = {
        group_name,
        profile_photo: file,
      };
      const id: number = Number(group_id);
      return await groupRepository.updateGroupData(
        groupData as unknown as Group,
        id
      );
    } catch (error) {
      throw new Error("Error while upating group data");
    }
  },

  async getGroupUsers(group_id: number) {
    try {
      return await groupRepository.getGroupUsers(group_id)
    } catch (error) {
      throw new Error("Error while get user group");
    }
  },

  async deleteGroup(group_id: number) {
    try {
      const group_data: Group | null = await groupRepository.getGroupData(
        group_id
      );
      if (group_data) {
        await groupRepository.deleteGroup(group_id);
        return group_data;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error while deleting group");
    }
  },

  async getGroupData(group_id:number){
    try {
      return groupRepository.getGroupData(group_id)
    } catch (error) {
      throw new Error("Error while get group data");
      
    }
  }
};
