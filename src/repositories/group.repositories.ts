import { Group, Member } from "../models";

export const groupRepository = {
  async createGroup(data: Group) {
    try {
      return await Group.create(data);
    } catch (error) {
      throw error;
    }
  },

  async getGroups(user_id: number) {
    try {
      const groups = await Group.findAll({
        attributes: ["group_id", "group_name"], //this will include this field also
        include: [
          {
            model: Member,
            where: { user_id },
            attributes: [], //By using this we will be able to exclude all field of Member module
          },
        ],
      });
      return groups;
    } catch (error) {
      throw new Error("Error while fetching the groups data");
    }
  },

  async updateGroupData(data: Group, group_id: number) {
    try {
      const data2 = await Group.update(data, {
        where: {
          group_id,
        },
      });
      return data2;
    } catch (error) {
      throw new Error("Error while updating group data");
    }
  },

  async grtGroupData(group_id: number) {
    try {
      return await Group.findOne({
        where: {
          group_id,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
