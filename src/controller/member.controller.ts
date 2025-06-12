import { Request, Response } from "express";
import { memberService } from "../services/member.service";

export const memberController = {
  async addUser(req: Request, res: Response) {
    try {
      const group_id = Number(req.body.group_id);
      const member_id = Number(req.body.member_id);
      const admin_id = Number(req.user?.user_id);
      const data = await memberService.addUser(group_id, member_id, admin_id);
      if (data) {
        res.json("User successfully aded to the group");
      } else {
        res.json("User already present in group");
      }
    } catch (error) {
      throw error;
    }
  },
};
