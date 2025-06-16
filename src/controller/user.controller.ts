import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { userRepository } from "../repositories/user.repositories";

export const userController = {
  async requestOTp(req: Request, res: Response): Promise<void> {
    try {
      const data = await userService.requestOtp(req.body.email);
      if (data) {
        res.cookie("user_email", req.body.email);
        res.status(200).json({
          data,
          message: `Mail sent to ${req.body.email} successfully `,
        });
      } else {
        res
          .status(500)
          .json(
            "User already exist try with different email or something went wrong"
          );
      }
    } catch (error) {
      res.status(500).json("something went wrong or email does not exists");
    }
  },

  async verifyOtp(req: Request, res: Response) {
    try {
      const email: string = req.cookies.user_email;
      const response = await userService.verifyOtp(email, req.body.otp);
      if (response) {
        res.json({ response, message: "Otp verified successfully" });
      } else {
        res.json("Otp is wrong");
      }
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
      if (isUser) {
        res.cookie("jwt_token", isUser);
        res.status(200).json(isUser);
      } else {
        res
          .status(500)
          .json("You are not log in user or credential does not match");
      }
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

  async getUserDetails(req: Request, res: Response) {
    try {
      const userData = await userService.getIndividualUser(req.params.user_id);
      res.json(userData);
    } catch (error) {
      throw new Error(
        "Error in user controller when fetching individual user details"
      );
    }
  },

  async getUserWithChat(req: Request, res: Response) {
    try {
      const data = await userService.getUserWithChat(req.params.group_id);
      res.json(data);
    } catch (error) {
      throw new Error("Error while fetching group chat data");
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const userData = await userService.updateUser(
        req.body,
        req.file?.path as string,
        req.user?.user_id as number
      );
      res.json(userData);
    } catch (error) {
      throw new Error("Error while updating user details");
    }
  },

  async logOutUser(req: Request, res: Response) {
    try {
      res.clearCookie("jwt_token");
      res.json("Successfully log out");
    } catch (error) {
      throw new Error("Error while trying to log out");
    }
  },


};
