import { json } from "body-parser";
import { groupService } from "../services/group.service";
import { Request, Response } from "express";

export const groupController = {
  async createGroup(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const groupName: string = req.body.groupName;
      const data = await groupService.createGroup(id, groupName);
      res.json(data);
    } catch (error) {
      throw error;
    }
  },

  async addUser(req: Request, res: Response) {
    try {
      const group_id = Number(req.body.group_id);
      const member_id = Number(req.body.member_id)
      const admin_id = Number(req.params.admin_id)
      const data = await  groupService.addUser(group_id,member_id,admin_id)
    } catch (error) {
        throw error
    }
  },
};
