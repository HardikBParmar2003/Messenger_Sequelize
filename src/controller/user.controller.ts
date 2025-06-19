import { Request, response, Response } from "express";
import { userService } from "../services/user.service";
import { generatePersonalChatPDF } from "../generatPDF/personalChat.pdf";
import { generatGroupChatPDF } from "../generatPDF/groupChat.pdf";
import { Chat, Otp, User } from "../models";

export const userController = {
  async requestOTp(req: Request, res: Response): Promise<void> {
    try {
      console.log("hello");
      const data: false | Otp = await userService.requestOtp(req.body.email);
      if (data) {
        res.cookie("user_email", req.body.email);
        res.status(200).json({
          data,
          message: `Mail sent to ${req.body.email} successfully `,
        });
      } else {
        res.status(400).json({
          data: null,
          message:
            "User already exist try with different email or something went wrong",
        });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "something went wrong or email does not exists",
      });
    }
  },

  async verifyOtp(req: Request, res: Response) {
    try {
      const email: string = req.cookies.user_email;
      const response: Otp | null = await userService.verifyOtp(
        email,
        req.body.otp
      );
      if (response) {
        res
          .status(200)
          .json({ data: response, message: "Otp verified successfully" });
      } else {
        res.status(500).json({ data: null, message: "Otp is wrong" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: "something went wrong" });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.cookies.user_email;
      const userData: User = await userService.create(req.body, email);
      res
        .status(201)
        .json({ data: userData, message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async logIn(req: Request, res: Response): Promise<void> {
    try {
      const isUser: string | false = await userService.logIn(req.body);
      if (isUser) {
        res.cookie("jwt_token", isUser);
        res.status(200).json({ date: isUser, message: "Successfull login" });
      } else {
        res
          .status(500)
          .json("You are not log in user or credential does not match");
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async findUser(req: Request, res: Response) {
    try {
      const value: string = req.body.value;
      const data: User[] = await userService.findUser(value);
      res.status(200).json({ data: data, message: "Users find successfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getUserDetails(req: Request, res: Response) {
    try {
      const userData: User | null = await userService.getIndividualUser(
        req.params.user_id
      );
      if (userData) {
        res.status(200).json({
          data: userData,
          message: "User details fetched successfully",
        });
      } else {
        res.status(400).json({ date: null, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getUserWithChat(req: Request, res: Response) {
    try {
      const data: Chat[] = await userService.getUserWithChat(
        req.params.group_id
      );
      res
        .status(200)
        .json({ data: data, message: "Chat data retrieve successfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const userData = await userService.updateUser(
        req.body,
        req.file?.path as string,
        req.user?.user_id as number
      );
      res
        .status(200)
        .json({ data: userData, message: "User details updated successfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async logOutUser(req: Request, res: Response) {
    try {
      res.clearCookie("jwt_token");
      res.status(200).json({ data: null, message: "Successfully log out" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async generatePDFPersonalChat(req: Request, res: Response) {
    try {
      const personalChatPDF: boolean =
        await generatePersonalChatPDF.personalChat(req, res);
      if (personalChatPDF) {
        res
          .status(200)
          .json({ data: null, message: "PDF generate successfully" });
      } else {
        res.status(500).json({
          data: null,
          message: "No chat data to generate pdf or something went wrong",
        });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async generatePDFGroupChat(req: Request, res: Response) {
    try {
      const groupChatPDF: boolean = await generatGroupChatPDF.groupChatPDF(
        req,
        res
      );
      if (groupChatPDF) {
        res
          .status(200)
          .json({ data: null, message: "PDF generate successfully" });
      } else {
        res.status(500).json({
          data: null,
          message: "No chat data to generate pdf or something went wrong",
        });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
};
