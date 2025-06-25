import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repositories";
import { Otp, User } from "../models";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { date } from "joi";
import { sendEmail } from "../emailSender/sendEmail";
import { Request } from "express";

dotenv.config();

export const userService = {
  async requestOtp(email: string) {
    try {
      let isExist: User[] = await userRepository.getUserByEmail(email);
      if (!isExist.length) {
        let otp: string = "";
        for (let i: number = 0; i < 6; i++) {
          otp += Math.floor(Math.random() * 10);
        }
        const Emaildata = await sendEmail.otpSendEmail(email, otp);
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
        const data = {
          email: email,
          otp: otp,
          expiresAt: expiresAt,
        };
        const otpStoreData: Otp = await userRepository.storeOtp(data as Otp);
        return otpStoreData;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error while sinding email");
      ``;
    }
  },

  async verifyOtp(email: string, otp: string) {
    try {
      return await userRepository.verifyOtp(email, otp);
    } catch (error) {
      throw new Error("Error while verifying oyp");
    }
  },

  async create(data: User, email: string) {
    try {
      const password: string = await bcrypt.hash(data.password, 10);
      const userData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: email,
        password: password,
      };
      return userRepository.create(userData as User);
    } catch (error) {
      throw new Error("error while creating password");
    }
  },

  async logIn(data: User) {
    try {
      const userData = await userRepository.logIn(data);
      if (userData) {
        const password: string = userData?.password as string;
        const isUser: boolean = await bcrypt.compare(data.password, password);
        if (isUser) {
          const jwtToken: string = jwt.sign(
            {
              user_id: userData?.user_id,
              email: userData?.email,
              first_name: userData?.first_name,
              last_name: userData?.last_name,
            },
            process.env.SECRET_KEY as string,
            { expiresIn: "1h" }
          );
          return jwtToken;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Log in attemt is unsuccessfull");
    }
  },

  async findUser(req: Request) {
    try {
      return await userRepository.findUser(req);
    } catch (error) {
      throw new Error("User details not found");
    }
  },

  async getIndividualUser(user_id: number) {
    try {
      return await userRepository.getIndividualUser(user_id);
    } catch (error) {
      throw new Error("Error when fetching individual user details");
    }
  },

  async getUserWithChat(group_id: string) {
    try {
      return await userRepository.getUserWithChat(Number(group_id));
    } catch (error) {
      throw new Error("Error while fetching group chat data with user");
    }
  },

  async updateUser(data: User, file: string, user_id: number) {
    try {
      const data2 = {
        first_name: data?.first_name,
        last_name: data?.last_name,
        profile_photo: file,
      };
      return await userRepository.updateUser(data2 as User, user_id);
    } catch (error) {
      throw new Error("Error while updating user details");
    }
  },
};
