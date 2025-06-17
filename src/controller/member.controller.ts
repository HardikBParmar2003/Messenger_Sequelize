import { Request, Response } from "express";
import { memberService } from "../services/member.service";
import { Member } from "../models";

export const memberController = {
  async addUser(req: Request, res: Response) {
    try {
      const group_id = Number(req.body.group_id);
      const member_id = Number(req.body.member_id);
      const admin_id = Number(req.user?.user_id);
      const data:false | Member = await memberService.addUser(group_id, member_id, admin_id);
      if (data) {
        res.json("User successfully added to the group");
      } else {
        res.json("User already present in group");
      }
    } catch (error) {
      throw error;
    }
  },

  async removeUser(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.params.user_id);
      const data:number = await memberService.removeUser(user_id);
      res.json(data);
    } catch (error) {
      throw new Error("Error while remove user from group");
    }
  },
  
};
