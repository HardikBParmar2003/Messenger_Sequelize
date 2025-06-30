import { Transaction } from "sequelize/types/transaction";
import { Group, Member, Permission, Role, RolePermission } from "../models";

export const groupRepository = {
  async createGroup(data: Group, options?: { transaction?: Transaction }) {
    try {
      return await Group.create(data);
    } catch (error) {
      throw new Error("Error while creating group data");
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

  async getGroupData(group_id: number) {
    try {
      return await Group.findByPk(group_id);
    } catch (error) {
      throw new Error("Can't fetch group data");
    }
  },

  async deleteGroup(group_id: number) {
    try {
      return await Group.destroy({
        where: { group_id },
      });
    } catch (error) {
      throw new Error("Error while deleting group");
    }
  },
  async groupExist(user_id: number, group_name: string) {
    try {
      return await Group.findOne({
        where: {
          user_id,
          group_name,
        },
      });
    } catch (error) {
      throw new Error("Error while checking group");
    }
  },
};
