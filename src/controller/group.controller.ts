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
};
