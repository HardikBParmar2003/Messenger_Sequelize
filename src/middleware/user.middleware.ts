import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import * as cookie from "cookie";
import { User } from "../models";
dotenv.config();

interface JWTPayload {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const userMiddleware = {
  async isAuthorizedUser(req: Request, res: Response, next: NextFunction) {
    let token: string = req.cookies.jwt_token;
    try {
      jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (
          err: jwt.VerifyErrors | null,
          user: string | jwt.JwtPayload | undefined
        ) => {
          if (err) {
            res.status(400).json({
              data: "null",
              message: "Forbidden: Invalid token or token expired",
            });
            return;
          }
          req.user = user as JWTPayload;
          next();
        }
      );
    } catch (error) {
      throw error;
    }
  },

  // async verifyUser(req: Request, res: Response, next: NextFunction) {
  //   let token: string = req.cookies.jwt_token;
  //   try {
  //     jwt.verify(
  //       token,
  //       process.env.SECRET_KEY as string,
  //       (
  //         err: jwt.VerifyErrors | null,
  //         user: string | jwt.JwtPayload | undefined
  //       ) => {
  //         if (err) {
  //           res.status(400).json({
  //             data: "null",
  //             message: "Forbidden: Invalid token or token expired",
  //           });
  //           return;
  //         }
  //         req.user = user as JWTPayload;
  //         next()
  //       }
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  getUserIdFromSocket(socket: any) {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.jwt_token;
    if (token) {
      try {
        const user:User = jwt.verify(token, process.env.SECRET_KEY as string) as User;
        return user;
      } catch (error) {
        throw error;
      }
    } else {
      return;
    }
  },
};
