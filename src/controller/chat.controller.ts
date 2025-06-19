import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repositories";
import { chatService } from "../services/chat.service";
import { Chat } from "../models";
import { any } from "joi";
export const chatController = {
  async addPersonalChat(req: Request, res: Response) {
    try {
      const sender_id: number = req.user?.user_id as number;
      const receiver_id: number = Number(req.params.receiver_id);
      const message: string = req.body.message;
      const chatData: Chat = await chatService.addPersonalChat(
        sender_id,
        receiver_id,
        message
      );
      res
        .status(200)
        .json({ data: chatData, mesage: "chat data added succesfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async addGroupChat(req: Request, res: Response) {
    try {
      const sender_id: number = req.user?.user_id as number;
      const group_id: number = Number(req.params.group_id);
      const message: string = req.body.message;
      const chatData: Chat = await chatService.addGroupChat(
        sender_id,
        group_id,
        message
      );
      res
        .status(200)
        .json({ data: chatData, mesage: "chat data added succesfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getUserChat(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.params.user_id);
      const admin_id: number = req.user?.user_id as number;
      const userChatData = await chatService.getUserChat(admin_id, user_id);
      if (userChatData.length > 0) {
        res.status(200).json({
          data: userChatData,
          message: "User chat retrieve successfully",
        });
      } else {
        res.status(200).json({ data: null, message: "No chat to show" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  // async getGroupChat(req: Request, res: Response) {
  //   try {
  //     const group_id: number = Number(req.params.group_id);
  //   } catch (error) {
  //     res.status(500).json({ data: null, message: error });
  //   }
  // },

  async getAllChattingUser(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.user?.user_id);
      const data = await chatService.getAllChattingUser(user_id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
};
