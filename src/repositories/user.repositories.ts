import { Chat, Otp, User } from "../models";
import { Op } from "sequelize";
import { Request } from "express";
import { findUserType } from "../../interface";

export const userRepository = {
  async storeOtp(data: Otp) {
    try {
      return await Otp.create(data);
    } catch (error) {
      throw new Error("Error while create oyp");
    }
  },

  async destroyOtp() {
    try {
      const now = new Date();
      return await Otp.destroy({
        where: {
          expiresAt: {
            [Op.lt]: now,
          },
        },
      });
    } catch (error) {
      throw new Error("Error whuile deleteing otp");
    }
  },

  async verifyOtp(email: string, otp: string) {
    try {
      let userOtp: string = String(otp);
      const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const isVerified = await Otp.findOne({
        where: {
          email: email,
          otp: userOtp,
          expiresAt: {
            [Op.gt]: cutoffDate,
          },
        },
      });
      return isVerified;
    } catch (error) {
      throw new Error("Unable to verify otp");
    }
  },

  async create(data: User) {
    try {
      const userData = await User.create(data);
      return userData;
    } catch (error) {
      throw error;
    }
  },

  async logIn(data: User) {
    try {
      const userData = await User.findOne({
        where: {
          email: data.email,
        },
      });
      return userData?.dataValues;
    } catch (error) {
      throw new Error("Unable to find user for log in");
    }
  },

  async findUser(req: Request) {
    try {
      const value: string = req.query.value as string;
      const page: number = Number(req.query?.page) || 1;
      const pageSize: number = Number(req.query?.pageSize) || 10;
      const sortType: string = (req.query?.sortType as string) || "ASC";
      const sortBy: string = (req.query?.sortBy as string) || "user_id";
      const { rows, count }:findUserType = await User.findAndCountAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: [[sortBy, sortType]],
        where: {
          [Op.or]: [
            { first_name: { [Op.iLike]: `%${value}%` } },
            { last_name: { [Op.iLike]: `%${value}%` } },
            { email: { [Op.iLike]: `%${value}%` } },
          ],
        },
      });
      return {
         rows,
         count,
      };
    } catch (error) {
      throw new Error("No any user");
    }
  },

  async getAllUser(user_id: number) {
    try {
      return await Chat.findAll({
        where: {
          [Op.or]: [{ sender_id: user_id }, { receiver_id: user_id }],
        },
        include: [
          {
            model: User,
          },
        ],
      });
    } catch (error) {
      throw new Error("Error Occured while fetching users");
    }
  },

  async getIndividualUser(user_id: number) {
    try {
      return await User.findByPk(user_id, {
        attributes: {
          exclude: ["createdAt,updatedAt,password"],
        },
      });
    } catch (error) {
      throw new Error(
        "Error in user repository when fetching individual user details"
      );
    }
  },

  async getUserWithChat(group_id: number) {
    try {
      const data = await Chat.findAll({
        where: { group_id },
        attributes: ["message", "createdAt"],

        include: [
          {
            model: User,
            as: "sender",
            attributes: ["user_id", "first_name", "last_name", "profile_photo"],
          },
        ],
      });
      return data;
    } catch (error) {
      throw new Error("Error while fetching group chats by user");
    }
  },

  async updateUser(data: User, user_id: number) {
    try {
      return await User.update(data, {
        where: {
          user_id,
        },
      });
    } catch (error) {
      throw new Error("Error while updating user detais");
    }
  },

  async getUserByEmail(email: string) {
    try {
      return await User.findAll({
        where: {
          email: { [Op.iLike]: `%${email}%` },
        },
      });
    } catch (error) {
      throw new Error("User not found with this email");
    }
  },
};
