import { profile } from "console";
import { groupService } from "../services/group.service";
import { Request, Response } from "express";
import { Group } from "../models";

export const groupController = {
  async createGroup(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.user?.user_id);
      const groupName: string = req.body.groupName;
      const data = await groupService.createGroup(user_id, groupName);
      res
        .status(201)
        .json({ data: data, message: "Group created syuccessfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getGroups(req: Request, res: Response) {
    try {
      const user_id: number = req.user?.user_id as number;
      const groupData:Group[] = await groupService.getGroups(user_id);
      if (groupData.length > 0) {
        res.status(200).json({
          data: groupData,
          message: "Group data fetched successfully",
        });
      } else {
        res.status(200).json({ data: null, message: "No groups to show" });
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
      if (groupData[0] == 1) {
        res.status(200).json({
          data: groupData,
          message: "Group data updates successfully",
        });
      } else {
        res.status(500).json({ date: null, message: "Group data not updated" });
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
