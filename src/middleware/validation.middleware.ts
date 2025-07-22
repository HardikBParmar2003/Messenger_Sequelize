import { Request, Response, NextFunction } from "express";
import {
  logInValidation,
  signUpValidation,
  updateValidation,
} from "../validators/validation";

export const validationMiddleware = {
  async validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const logInData = {
        email: req.body.email,
        password: req.body.password,
      };
      const { error, value } = logInValidation.validate(logInData);
      if (error) {
        res.status(401).json({ data: null, message: error.details[0].message });
      } else {
        next();
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error[0].message });
    }
  },

  async validateSignup(req: Request, res: Response, next: NextFunction) {
    const { error, value } = signUpValidation.validate(req.body);
    if (error) {
      res.status(401).json({ data: null, message: error.details[0].message });
    } else {
      next();
    }
  },

  async validateUpdation(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body || req.file) {
        if (req.file) {
          const updateData = {
            first_name: req.body.first_name! as string | undefined,
            last_name: req.body.last_name as string | undefined,
            password: req.body.password as string | undefined,
            file: req.file as Express.Multer.File | undefined,
          };
          const { error, value } = updateValidation.validate({
            ...updateData,
            file: {
              mimetype: updateData.file?.mimetype,
              size: updateData.file?.size,
            },
          });
          if (error) {
            res
              .status(401)
              .json({ data: null, message: error.details[0].message });
          } else {
            next();
          }
        } else {
          const updateData = {
            first_name: req.body.first_name! as string | undefined,
            last_name: req.body.last_name as string | undefined,
          };
          const { error, value } = updateValidation.validate({
            ...updateData,
          });
          if (error) {
            res
              .status(401)
              .json({ data: null, message: error.details[0].message });
          } else {
            next();
          }
        }
      } else {
        res
          .status(400)
          .json({ data: null, message: "No data provided for update" });
      }
    } catch (error) {
      res.json(500).json({
        data: null,
        message: "Sometghing went wrong while try to update",
      });
    }
  },
};
