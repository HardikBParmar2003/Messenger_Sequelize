import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User, Otp, Group, Member, Chat, Status, Call, Role, Permission, RolePermission } from "../models";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "postgres",
      models: [User, Otp, Group, Member, Chat, Status, Call, Role, Permission, RolePermission],
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize({
      dialect: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USER, 
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User, Otp, Group, Member, Chat, Status, Call, Role, Permission, RolePermission],
      logging: false,
    });

