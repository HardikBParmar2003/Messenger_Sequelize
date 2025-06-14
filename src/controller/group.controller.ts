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
      res.json(data);
    } catch (error) {
      throw error;
    }
  },

  async getGroups(req: Request, res: Response) {
    try {
      const user_id: number = req.user?.user_id as number;
      const groupData = await groupService.getGroups(user_id);
      res.json(groupData);
    } catch (error) {
      throw new Error("Error while fetching your groups");
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
        res.status(200).json(groupData);
      }else{
        res.json("Sommething went wrong")
      }
    } catch (error) {
      throw new Error("Error while updating froup data");
    }
  },
};
