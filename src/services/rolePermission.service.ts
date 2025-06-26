import { rolePermissionRepository } from "../repositories/rolePermission.repoitories";

export const rolePermissionService = {
  async getRole(user_id: number, group_id: number) {
    try {
      return await rolePermissionRepository.getRole(user_id, group_id);
    } catch (error) {
      throw new Error("Something went wrong while fetching role");
    }
  },

  async getRolePermission(
    user_id: number,
    group_id: number,
    permission: string
  ) {
    try {
      const role = await rolePermissionRepository.getRolePermission(
        user_id,
        group_id
      );
      const hasPermission = role?.role?.permissions.some((p) =>p.permission == permission);
      return hasPermission;
    } catch (error) {
      throw new Error("Something went wrong when try to get permission");
    }
  },
};
