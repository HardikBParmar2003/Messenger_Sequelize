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
        if (isGroup) {
          const data = await groupService.createGroup(user_id, groupName);
          res
            .status(201)
            .json({ data: data, message: "Group created syuccessfully" });
        } else {
          res.status(400).json({
            data: null,
            mesage:
              "Duplicate Group name by same user try with different group name",
          });
        }
      } else {
        res
          .status(400)
          .json({ data: null, mesage: "Grtoup name can't be empty" });
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
        res.status(204).json();
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
      if (groupData[0] == 0) {
        res.status(500).json({ date: null, message: "No data to updated" });
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

  async deleteGroup(req: Request, res: Response) {
    try {
      const group_id: number = Number(req.params.group_id);
      const deleteGroup: number | false = await groupService.deleteGroup(
        group_id
      );
      if (deleteGroup != false) {
        res.status(200).json("Group deleted successfully");
      } else {
        res.status(400).json("Group not exist");
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error occured while try to delete group",
      });
    }
  },
};
