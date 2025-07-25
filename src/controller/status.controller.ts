import { Request, Response } from "express";
import { statusService } from "../services/status.service";
import { Status, User } from "../models";
import { date, Err } from "joi";
import { statusRepository } from "../repositories/status.repository";
import { userRepository } from "../repositories/user.repositories";

export const statusController = {
  async uploadStatus(req: Request, res: Response) {
    try {
      const description: string = req.body?.description;
      const file: string = (req.file?.path as string) || req.body?.status;
      const id: number = req.user?.user_id as number;

      if (description || file) {
        const statusData: Status = await statusService.uploadStatus(
          description,
          file,
          id
        );
        res
          .status(201)
          .json({ data: statusData, message: "status uploaded sucessfully" });
      } else {
        res
          .status(400)
          .json({ data: null, message: "No status for uploading" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async deleteStatus(req: Request, res: Response) {
    try {
      const user_id = req.user?.user_id as number;
      const status_id: number = Number(req.params.status_id);

      const statusData: number | false = await statusService.deleteStatus(
        user_id,
        status_id
      );
      if (statusData == false) {
        res.status(400).json({ data: null, message: "No status found" });
      } else {
        res
          .status(200)
          .json({ data: statusData, message: "Status deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getUserStatus(req: Request, res: Response) {
    try {
      const user_id: number =
        Number(req.params.user_id) || (req.user?.user_id as number);
      const user: User | null = await userRepository.getIndividualUser(user_id);
      if (user) {
        const statusData: Status[] = await statusService.getUserStatus(user_id);
        if (statusData.length > 0) {
          res
            .status(200)
            .json({ data: statusData, message: "Status fetched successfully" });
        } else {
          res.status(204).json();
        }
      } else {
        res.status(400).json({data:null,message:"User does not exist bad request"});
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getAllStatus(req: Request, res: Response) {
    try {
      const user_id: number = req.user?.user_id as number;
      const userStatusData: Object[] = await statusService.getAllStatus(
        user_id
      );
      if (userStatusData.length > 0) {
        res.status(200).json({
          data: userStatusData,
          message: "all status fetched successfully",
        });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async searchStatus(req: Request, res: Response) {
    try {
      const user_id: number = req.user?.user_id as number;
      const value: string = req.params.value;
      const userStatusData: Object[] = await statusService.searchStatus(
        user_id,
        value
      );
      if (userStatusData.length > 0) {
        res.status(200).json({
          data: userStatusData,
          message: "User details fetched successfully",
        });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
};
