import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { generatePersonalChatPDF } from "../generatPDF/personalChat.pdf";
import { generatGroupChatPDF } from "../generatPDF/groupChat.pdf";
import { Chat, Otp, User } from "../models";
import { userRepository } from "../repositories/user.repositories";
import { findUserType } from "../../interface";
import { groupService } from "../services/group.service";


export const userController = {
  async requestOTp(req: Request, res: Response): Promise<void> {
    try {
      const data: false | Otp = await userService.requestOtp(req.body.email);
      if (data) {
        res.cookie("user_email", req.body.email, {
          maxAge: 5 * 60 * 1000,
          httpOnly: true, // Can't be accessed from JavaScript (for security)
          sameSite: "none", // For cross-origin requests (CORS)
          secure:true
        });
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
        message: "Email does not exists or something went wrong",
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
      res.clearCookie("user_email");
      res
        .status(201)
        .json({ data: userData, message: "User created successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ data: null, message: "Something went wrong try again" });
    }
  },

  async logIn(req: Request, res: Response): Promise<void> {
    try {
      const isUser: false | { jwtToken: string; userData: User } =
        await userService.logIn(req.body);

      if (isUser) {
        res.cookie("jwt_token", isUser.jwtToken, {
          maxAge: 60 * 60 * 1000, // 1 hour
          httpOnly: true, // Can't be accessed from JavaScript (for security)
          sameSite: "none", // For cross-origin requests (CORS)
          secure:true
        });
        res.status(200).json({ data: isUser, message: "Successfull login" });
      } else {
        res.status(500).json({
          data: null,
          message: "You are not valid user or credential does not match",
        });
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error.message });
    }
  },

  async findUser(req: Request, res: Response) {
    try {
      const data: findUserType = await userService.findUser(req);
      if (data.rows.length > 0) {
        res.status(200).json({
          data: data.rows,
          totalRows: data.count,
          message: "Users find successfully",
        });
      } else {
        res.status(200).json({ data: [], message: "No data found" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getAllUser(req: Request, res: Response) {
    try {
      const user_id: number = req.user?.user_id as number;
      const userData = await userService.getAllUser(user_id);
    } catch (error) {
      res.status(500).json({ data: null, message: "Something went wrong " });
    }
  },

  async getUserDetails(req: Request, res: Response) {
    try {
      const user_id: number =
        Number(req.params.user_id) || (req.user?.user_id as number);
      const userData: User | null = await userService.getIndividualUser(
        user_id
      );
      if (userData) {
        res.status(200).json({
          data: userData,
          message: "User details fetched successfully",
        });
      } else {
        res.status(400).json({ data: null, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getUserWithChat(req: Request, res: Response) {
    try {
      const isExist = await groupService.getGroupData(
        Number(req.params.group_id)
      );
      if (isExist) {
        const data: Chat[] = await userService.getUserWithChat(
          req.params.group_id
        );
        if (data.length > 0) {
          res
            .status(200)
            .json({ data: data, message: "Chat data retrieve successfully" });
        } else {
          res.status(200).json({ data: [], message: "No Content" });
        }
      } else {
        res.status(200).json({ data: [], message: "No Group Found" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const profile: string =
        req.file?.path ||
        "https://res.cloudinary.com/duy1xfupo/image/upload/v1751265813/hardik/qnibi07eosueazvthvfz.png";
      const user_id: number = req.user?.user_id as number;
      const userData = await userService.updateUser(req.body, profile, user_id);
      if (userData[0] != 0) {
        const updatedUserData = await userRepository.getIndividualUser(user_id);
        res.status(200).json({
          data: updatedUserData,
          message: "User details updated successfully",
        });
      } else {
        res
          .status(200)
          .json({ data: userData, message: "No details for updating" });
      }
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
      const user = await userService.getIndividualUser(
        Number(req.body.user_id)
      );
      if (user) {
        const personalChatPDF: boolean =
          await generatePersonalChatPDF.personalChat(req, res);
        if (personalChatPDF) {
          res.status(200).json({
            data: null,
            message:
              "PDF generate successfully and sent to your registered Email !!!",
          });
        } else {
          res
            .status(200)
            .json({ data: null, message: "No chat to generate PDF" });
        }
      } else {
        res.status(400).json({ data: null, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async generatePDFGroupChat(req: Request, res: Response) {
    try {
      const isExist = await groupService.getGroupData(
        Number(req.params.group_id)
      );
      if (isExist) {
        const groupChatPDF: boolean = await generatGroupChatPDF.groupChatPDF(
          req,
          res
        );
        if (groupChatPDF) {
          res.status(200).json({
            data: null,
            message:
              "PDF generated successfully and sent to your registered Email !!!",
          });
        } else {
          res
            .status(200)
            .json({ data: null, message: "No chat to generate PDF" });
        }
      } else {
        res.status(400).json({ data: null, message: "No group exist" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
  async getToken(req: Request, res: Response) {
    try {
      const user = req.cookies.jwt_token;      
      if (user) {
        res.status(200).json({ data: true, message: "verified user" });
      } else {
        res.status(200).json({ data: false, message: "unverified user" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
  async getEmail(req: Request, res: Response) {
    try {
      const email = req.cookies.email;
      if (email) {
        res.status(200).json({ data: true, message: "user has email" });
      } else {
        res.status(200).json({ data: false, message: "user has not email" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
};
