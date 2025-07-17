import { Request, Response } from "express";
import { chatService } from "../services/chat.service";
import { Chat, User } from "../models";
export const chatController = {
  async addPersonalChat(req: Request, res: Response) {
    try {
      const sender_id: number = req.user?.user_id as number;
      const receiver_id: number = Number(req.params.receiver_id);
      const message: string = req.body.message;
      if (message) {
        const chatData: Chat = await chatService.addPersonalChat(
          sender_id,
          receiver_id,
          message
        );
        res
          .status(201)
          .json({ data: chatData, message: "chat data added succesfully" });
      } else {
        res.status(400).json({ data: null, message: "Message can't be empty" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async addGroupChat(req: Request, res: Response) {
    try {
      const sender_id: number = req.user?.user_id as number;
      const group_id: number = Number(req.params.group_id);
      const message: string = req.body.message;
      if (message) {
        const chatData: Chat = await chatService.addGroupChat(
          sender_id,
          group_id,
          message
        );
        res
          .status(201)
          .json({ data: chatData, message: "chat data added succesfully" });
      } else {
        res.status(400).json({ data: null, message: "Message can't be empty" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getUserChat(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.params.user_id);
      const admin_id: number = req.user?.user_id as number;
      const userChatData: Chat[] = await chatService.getUserChat(
        admin_id,
        user_id
      );
      if (userChatData.length > 0) {
        res.status(200).json({
          data: userChatData,
          message: "User chat retrieve successfully",
        });
      } else {
        res.status(200).json({data:[],message:"no data found"});

      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getAllChattingUser(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.user?.user_id);
      const data: User[] = await chatService.getAllChattingUser(user_id);
      if (data.length > 0) {
        res
          .status(200)
          .json({ data: data, message: "All data retrieve successfully" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
};
