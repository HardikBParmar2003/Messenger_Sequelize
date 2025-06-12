import { any } from "joi";
import { Otp, User } from "../models";
import { Op } from "sequelize";

export const userRepository = {
  async storeOtp(data: Otp) {
    try {
      return await Otp.create(data);
    } catch (error) {
      throw error;
    }
  },

  async verifyOtp(email: string) {
    try {
      return await Otp.findAll({
        where: {
          email,
        },
      });
    } catch (error) {}
  },

  async create(data: User) {
    try {
      const userData = await User.create(data);
      return userData
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
      throw error;
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
      throw error;
    }
  },

  // async creatGroup()
};
