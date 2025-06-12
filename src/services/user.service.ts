import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repositories";
import { Otp, User } from "../models";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { date } from "joi";
dotenv.config();

export const userService = {
  async requestOtp(email: string) {
    try {
      let otp: string = "";
      for (let i: number = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "projectmanagement760@gmail.com",
          pass: "vkpq qkmo mhvk ovzb",
        },
      });

      await transporter.sendMail({
        from: "projectmanagement760@gmail.com",
        to: email,
        subject: "OTP Verification",
        html: otp,
      });
      const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
      const data = {
        email: email,
        otp: otp,
        expiresAt: expiresAt,
      };

      const otpStoreData = userRepository.storeOtp(data as Otp);
      return otpStoreData;
    } catch (error) {
      throw error;
    }
  },

  async verifyOtp(email: string) {
    try {
      return await userRepository.verifyOtp(email);
      
    } catch (error) {
      throw error;
    }
  },

  async create(data: User, email: string) {
    try {
      const password: string = await bcrypt.hash(data.password, 10);
      const userData = {
        first_name:data.first_name,
        last_name:data.last_name,
        email:email,
        password:password
      }
      return userRepository.create(userData as User);
    } catch (error) {
      throw error;
    }
  },

  async logIn(data: User) {
    try {
      const userData = await userRepository.logIn(data);
      // console.log("userdata is",userData?.toJSON());
      const password: string = userData?.password as string;
      const isUser = await bcrypt.compare(data.password, password);
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
        return {};
      }
    } catch (error) {
      throw error;
    }
  },

  async findUser(value: string) {
    try {
      return await userRepository.findUser(value);
    } catch (error) {
      throw error;
    }
  },
};
