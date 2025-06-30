import { NextFunction, Response, Request } from "express";
import { rolePermissionService } from "../services/rolePermission.service";
import { groupRepository } from "../repositories/group.repositories";
import { memberRepository } from "../repositories/member.repositories";
import { userRepository } from "../repositories/user.repositories";
import { Group, Member, User } from "../models";

export const permissionMiddleware = {
  async deletePermission(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: number = req.user?.user_id as number;
      const group_id: number = Number(req.params.group_id);
      const isGroup: Group | null = await groupRepository.getGroupData(
        Number(req.params.group_id)
      );
      if (isGroup) {
        const permission: string = "delete_group";
        const role: Member | null = await rolePermissionService.getRole(
          user_id,
          group_id
        );
        if (role?.role.role == "admin") {
          const hasPermission: boolean | undefined =
            await rolePermissionService.getRolePermission(
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
      } else {
        res
          .status(400)
          .json({ data: null, message: "No group exist bad request" });
      }
    } catch (error) {
      res.status(500).json("Something Went Wrong");
    }
  },

  async updatePermission(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: number = req.user?.user_id as number;
      const group_id: number = Number(req.params.group_id);
      const isGroup: Group | null = await groupRepository.getGroupData(
        Number(req.params.group_id)
      );
      if (isGroup) {
        const permission: string = "update_group";
        const role: Member | null = await rolePermissionService.getRole(
          user_id,
          group_id
        );
        if (role?.role.role == "admin") {
          const hasPermission: boolean | undefined =
            await rolePermissionService.getRolePermission(
              user_id,
              group_id,
              permission
            );
          if (hasPermission) {
            next();
          } else {
            res.status(403).json({
              data: role?.role.role,
              data2: role,
              data3: hasPermission,
              message: "You don't have permission to update group",
            });
          }
        } else {
          res.status(403).json({
            data: role?.role.role,
            data2: role,
            message: "You don't have permission to update group",
          });
        }
      } else {
        res
          .status(400)
          .json({ data: null, message: "No group exist bad request" });
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
      const group_id: number = Number(req.body.group_id);
      const member_id: number = Number(req.body.member_id);
      const isUser: User | null = await userRepository.getIndividualUser(
        member_id
      );
      if (isUser) {
        const isGroup: Group | null = await groupRepository.getGroupData(
          group_id
        );
        if (isGroup) {
          const isMember: Member | null = await memberRepository.getUser(
            user_id,
            group_id
          );
          if (isMember) {
            const permission: string = "remove_member";
            const role: Member | null = await rolePermissionService.getRole(
              user_id,
              group_id
            );
            if (role?.role.role == "admin") {
              const hasPermission: boolean | undefined =
                await rolePermissionService.getRolePermission(
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
          } else {
            res
              .status(400)
              .json({ data: null, message: "No member present bad request" });
          }
        } else {
          res.status(400).json({ message: "No group exist bad request" });
        }
      } else {
        res
          .status(400)
          .json({ data: null, message: "No user exist bad request" });
      }
    } catch (error) {
      res.status(500).json("Something Went Wrong");
    }
  },

  async addmember(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: number = Number(req.user?.user_id);
      const member_id: number = Number(req.body.member_id);
      const group_id: number = Number(req.body.group_id);
      const isUser: User | null = await userRepository.getIndividualUser(
        member_id
      );
      if (isUser) {
        const isGroup: Group | null = await groupRepository.getGroupData(
          group_id
        );
        if (isGroup) {
          const permission: string = "add_member";
          const role: Member | null = await rolePermissionService.getRole(
            user_id,
            group_id
          );
          if (role?.role.role == "admin") {
            const hasPermission: boolean | undefined =
              await rolePermissionService.getRolePermission(
                user_id,
                group_id,
                permission
              );
            if (hasPermission) {
              next();
            } else {
              res.status(403).json({
                data: role?.role.role,
                message: "You don't have permission to add member to group",
              });
            }
          } else {
            res.status(403).json({
              data: role?.role.role,
              message: "You don't have permission to add member to group",
            });
          }
        } else {
          res
            .status(400)
            .json({ data: null, message: "Group does not exist bad request" });
        }
      } else {
        res
          .status(400)
          .json({ data: null, message: "User does not exist bad request" });
      }
    } catch (error) {
      res.status(500).json("Something Went Wrong");
    }
  },
};
