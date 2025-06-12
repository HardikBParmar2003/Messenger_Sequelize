import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  async requestOTp(req: Request, res: Response): Promise<void> {
    try {
      const data = await userService.requestOtp(req.body.email);
      res.cookie("user_email", req.body.email);
      res.json(data);
    } catch (error) {
      throw error;
    }
  },

  async verifyOtp(req: Request, res: Response) {
    try {
      const email: string = req.cookies.user_email;
      const response = await userService.verifyOtp(email);
      res.json(response);
    } catch (error) {
      throw error;
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.cookies.user_email;
      const userData = await userService.create(req.body, email);
      res.json(userData);
    } catch (error) {
      throw error;
    }
  },

  async logIn(req: Request, res: Response): Promise<void> {
    try {
      const isUser = await userService.logIn(req.body);
      res.cookie("jwt_token", isUser);
      res.status(200).json(isUser);
    } catch (error) {
      throw error;
    }
  },

  async findUser(req: Request, res: Response) {
    try {
      const value: string = req.body.value;
      const data = await userService.findUser(value);
      res.json(data);
    } catch (error) {
      throw error;
    }
  },
};
