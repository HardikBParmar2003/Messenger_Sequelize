import { Member, Permission, Role } from "../models";

export const rolePermissionRepository = {
  async getRole(user_id: number, group_id: number) {
    try {
      return await Member.findOne({
        where: {
          user_id,
          group_id,
        },
        attributes: [],
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["role_id", "role"],
          },
        ],
      });
    } catch (error) {
      throw new Error("Error while grtting role data");
    }
  },

  async getRolePermission(user_id: number, group_id: number) {
    try {
      const roleData = await Member.findOne({
        where: {
          user_id,
          group_id,
        },
        attributes: [],
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["role_id", "role"],
            include: [
              {
                model: Permission,
                as: "permissions",
                attributes: ["permission"],
              },
            ],
          },
        ],
      });
      return roleData;
    } catch (error) {
      throw error;
    }
  },
};
