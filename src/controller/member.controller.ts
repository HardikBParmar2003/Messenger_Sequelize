import { Request, Response } from "express";
import { memberService } from "../services/member.service";
import { Group, Member, User } from "../models";
import { userRepository } from "../repositories/user.repositories";
import { groupRepository } from "../repositories/group.repositories";

export const memberController = {
  async addUser(req: Request, res: Response) {
    try {
      const group_id = Number(req.body.group_id);
      const member_id = Number(req.body.member_id);
      const admin_id = Number(req.user?.user_id);
      const data: false | Member = await memberService.addUser(
        group_id,
        member_id,
        admin_id
      );
      if (data != false) {
        res.status(201).json({
          data: data,
          message: "User successfully added to the group",
        });
      } else {
        res
          .status(400)
          .json({ data: null, mesage: "User already present in group" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async removeUser(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.body.member_id);
      const group_id: number = Number(req.body.group_id);
      const data: number | false = await memberService.removeUser(
        user_id,
        group_id
      );
      if (data != false) {
        res.status(200).json({
          data: data,
          message: "User removed from group successfully",
        });
      } else {
        res.status(400).json("User is not exists in group");
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async leftGroup(req: Request, res: Response) {
    try {
      const user_id: number = req.user?.user_id as number;
      const group_id: number = Number(req.params.group_id);
      const isGroup: Group | null = await groupRepository.getGroupData(
        group_id
      );
      if (isGroup) {
        const data: number | false = await memberService.removeUser(
          user_id,
          group_id
        );
        if (data != false) {
          res.status(200).json({
            data: data,
            message: "User left  group successfully",
          });
        } else {
          res.status(500).json("User is not exists in group");
        }
      } else {
        res.status(400).json({ data: null, message: "Group is not exist" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
};
