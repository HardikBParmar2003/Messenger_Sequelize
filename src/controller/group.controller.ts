import { groupService } from "../services/group.service";
import { Request, Response } from "express";
import { Group } from "../models";
import { groupRepository } from "../repositories/group.repositories";

export const groupController = {
  async createGroup(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.user?.user_id);
      const groupName: string = req.body.groupName;
      if (groupName) {
        const isGroup = await groupRepository.groupExist(user_id, groupName);
        if (!isGroup) {
          const data = await groupService.createGroup(user_id, groupName);
          if (data) {
            res
              .status(201)
              .json({ data: data, message: "Group created syuccessfully" });
          } else {
            res
              .status(201)
              .json({ data: null, message: "Something Went wrong" });
          }
        } else {
          res.status(400).json({
            data: null,
            message:
              "Duplicate Group name by same user try with different group name",
          });
        }
      } else {
        res
          .status(400)
          .json({ data: null, message: "Grtoup name can't be empty" });
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error.message });
    }
  },

  async getGroups(req: Request, res: Response) {
    try {
      const user_id: number = req.user?.user_id as number;
      const groupData: Group[] = await groupService.getGroups(user_id);
      if (groupData.length > 0) {
        res.status(200).json({
          data: groupData,
          message: "Group data fetched successfully",
        });
      } else {
        res.status(200).json({
          data: [],
          message: "No Group data ",
        });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async updateGroupData(req: Request, res: Response) {
    try {
      const groupData = await groupService.updateGroupData(
        req.body.group_name,
        req.file?.path as string,
        req.params.group_id
      );
      if (!groupData) {
        res.status(500).json({ date: null, message: "Something Went Wrong" });
      } else {
        res.status(200).json({
          data: groupData,
          message: "Group data updates successfully",
        });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getGroupUsers(req: Request, res: Response) {
    try {
      const group_id: number = Number(req.params.group_id);
      const group_data: Group | null = await groupRepository.getGroupData(
        group_id
      );
      if (group_data) {
        const groupUsers = await groupService.getGroupUsers(group_id);
        res
          .status(200)
          .json({ data: groupUsers, message: "Users fetched successfully" });
      } else {
        res
          .status(400)
          .json({ data: null, message: "Group is not exist bad request" });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Something went wrong",
      });
    }
  },

  async deleteGroup(req: Request, res: Response) {
    try {
      const group_id: number = Number(req.params.group_id);
      const deleteGroup: Group | false = await groupService.deleteGroup(
        group_id
      );
      if (deleteGroup) {
        res
          .status(200)
          .json({ data: deleteGroup, messae: "Group deleted successfully" });
      } else {
        res.status(400).json({ data: null, message: "Group not exist" });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error occured while try to delete group",
      });
    }
  },

  async getGroupData(req: Request, res: Response) {
    try {
      const group_id: number = Number(req.params.group_id);
      const group: Group | null = await groupService.getGroupData(group_id);
      if (group) {
        res
          .status(200)
          .json({ data: group, message: "Group data etched successfully"});
      }else{
        res.status(200).json({data:null,message:"No group found"})
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error occured while try to delete group",
      });
    }
  },
};
