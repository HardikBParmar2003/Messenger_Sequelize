import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User, Otp, Group, Member, Chat, Status, Call, Role, Permission, RolePermission } from "../models";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  models: [User, Otp, Group, Member, Chat, Status, Call, Role, Permission, RolePermission],
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // for Railway SSL
    },
  },
});
