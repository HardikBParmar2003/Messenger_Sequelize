import { Transaction } from "sequelize/types/transaction";
import {
  Chat,
  Group,
  Member,
  Permission,
  Role,
  RolePermission,
  User,
} from "../models";
import { getgroups } from "process";
import { Sequelize } from "sequelize-typescript";

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
        attributes: [
          "group_id",
          "group_name",
          "profile_photo",
          "user_id",
          [
            Sequelize.fn("MAX", Sequelize.col("chat.createdAt")),
            "latestMessageTime",
          ],
        ], //this will include this field also
        include: [
          {
            model: Member,
            where: { user_id },
            attributes: [],
          },
          {
            model: Chat,
            attributes: [],
          },
        ],
        group: ["Group.group_id"],
        order: [
          [Sequelize.fn("MAX", Sequelize.col("chat.createdAt")), "DESC"],
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
      return await Group.findByPk(group_id, {
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
      });
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
        paranoid:true
      });
    } catch (error) {
      throw new Error("Error while checking group");
    }
  },

  async getGroupUsers(group_id: number) {
    try {
      const groupUsers = await Member.findAll({
        where: { group_id },
        attributes: [],
        include: {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt,updateAt"],
          },
        },
      });
      return groupUsers;
    } catch (error) {
      throw new Error("Error while get users from group");
    }
  },
};
