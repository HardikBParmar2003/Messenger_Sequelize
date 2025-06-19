import { Group, Member } from "../models";

export const memberRepository = {
  async addUser(data: Member) {
    try {
      const isExist = await Member.findOne({
        where: {
          group_id: data.group_id,
          admin_id: data.admin_id,
          user_id: data.user_id,
        },
      });
      if (isExist) {
        return false;
      } else {
        return await Member.create(data);
      }
    } catch (error) {
      throw new Error("Error while adding this member to group");
    }
  },

  async removeUser(user_id: number) {
    try {
      return await Member.destroy({
        where: {
          user_id,
        },
      });
    } catch (error) {
      throw new Error("Error while remove user from group");
    }
  },

  async getUser(user_id: number) {
    try {
      return await Member.findOne({
        where: {
          user_id,
        },
      });
    } catch (error) {
      throw new Error("Error while checking user");
    }
  },
};
