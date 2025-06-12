import { Member } from "../models";

export const memberRepositories = {
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
      throw error;
    }
  },
};
