import { NextFunction, Response, Request } from "express";
import { rolePermissionService } from "../services/rolePermission.service";

export const permissionMiddleware = {
  async deletePermission(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: number = req.user?.user_id as number;
      const group_id: number = Number(req.params.group_id);
      const permission: string = "delete_group";
      const role = await rolePermissionService.getRole(user_id, group_id);
      if (role?.role.role == "admin") {
        const hasPermission = await rolePermissionService.getRolePermission(
          user_id,
          group_id,
          permission
        );
        if (hasPermission) {
          next();
        } else {
          res.status(403).json({
            data: role?.role.role,
            message: "You don't have permission to delete group",
          });
        }
      } else {
        res.status(403).json({
          data: role?.role.role,
          message: "You don't have permission to delete group",
        });
      }
    } catch (error) {
      res.status(500).json("Something Went Wrong");
    }
  },

  async updatePermission(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: number = req.user?.user_id as number;
      const group_id: number = Number(req.params.group_id);
      const permission: string = "update_group";
      const role = await rolePermissionService.getRole(user_id, group_id);
      if (role?.role.role == "admin") {
        const hasPermission = await rolePermissionService.getRolePermission(
          user_id,
          group_id,
          permission
        );
        if (hasPermission) {
          next();
        } else {
          res.status(403).json({
            data: role?.role.role,
            message: "You don't have permission to update group",
          });
        }
      } else {
        res.status(403).json({
          data: role?.role.role,
          message: "You don't have permission to update group",
        });
      }
    } catch (error) {
      res.status(500).json("Something Went Wrong");
    }
  },

  async removeMemberPermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user_id: number = req.user?.user_id as number;
      const group_id: number = Number(req.params.group_id);
      const permission: string = "remove_member";
      const role = await rolePermissionService.getRole(user_id, group_id);
      if (role?.role.role == "admin") {
        const hasPermission = await rolePermissionService.getRolePermission(
          user_id,
          group_id,
          permission
        );
        if (hasPermission) {
          next();
        } else {
          res.status(403).json({
            data: role?.role.role,
            message: "You don't have permission to emove group",
          });
        }
      } else {
        res.status(403).json({
          data: role?.role.role,
          message: "You don't have permission to remove group",
        });
      }
    } catch (error) {
      res.status(500).json("Something Went Wrong");
    }
  },
};
