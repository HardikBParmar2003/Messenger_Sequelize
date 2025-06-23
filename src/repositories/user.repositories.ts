import { Chat, Otp, User } from "../models";
import { Op } from "sequelize";

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
      throw new Error("Error whuile deleteing otp")
    }
  },

  async verifyOtp(email: string, otp: string) {
    try {
      const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const isVerified = await Otp.findOne({
        where: {
          email: email,
          otp: otp,
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
      throw new Error("Unable to find user for log in")
    }
  },

  async findUser(value: string) {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        where: {
          [Op.or]: [
            { first_name: { [Op.like]: `%${value}%` } },
            { last_name: { [Op.like]: `%${value}%` } },
            { email: { [Op.like]: `%${value}%` } },
          ],
        },
      });
      return userData;
    } catch (error) {
      throw new Error("No any user");
    }
  },

  async getIndividualUser(user_id: number) {
    try {
      return await User.findByPk(user_id);
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
        attributes: ["message","createdAt"],

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
      console.log("data is update",user_id,data);
      return await User.update(data, {
        where: {
          user_id,
        },
      });
    } catch (error) {
      throw new Error("Error while updating user detais");
    }
  },
};
