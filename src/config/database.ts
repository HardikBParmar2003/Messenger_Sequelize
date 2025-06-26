import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User, Otp, Group, Member, Chat, Status, Call, Role, Permission,RolePermission } from "../models";
dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [User, Otp, Group, Member, Chat, Status, Call, Role, Permission, RolePermission],
  logging: false,
});
