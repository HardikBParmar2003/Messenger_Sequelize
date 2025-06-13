import { groupService } from "../services/group.service";
import { Request, Response } from "express";
import { memberService } from "../services/member.service";

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
      console.log("Hello");
      const user_id: number = req.user?.user_id as number;
      const groupData = await groupService.getGroups(user_id);
      res.json(groupData);
    } catch (error) {
      throw new Error("Error while fetching your groups");
    }
  },
};
