import { Request, Response } from "express";
import { statusService } from "../services/status.service";
import { Status } from "../models";
import { statusDelete } from "../cron/statusDelete";
import { json } from "body-parser";
export const statusController = {
  async uploadStatus(req: Request, res: Response) {
    try {
      const description: string = req.body.description;
      const file: string = (req.file?.path as string) || req.body.status;
      const id: number = req.user?.user_id as number;
      const statusData: Status = await statusService.uploadStatus(
        description,
        file,
        id
      );
      res
        .status(201)
        .json({ data: statusData, message: "status uploaded sucessfully" });
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
      }
      res
        .status(200)
        .json({ data: statusData, message: "Status deleted successfully" });
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getUserStatus(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.params.user_id);
      const statusData: Status[] = await statusService.getUserStatus(user_id);
      if (statusData.length > 0) {
        res.status(200).json({data:statusData,message:"Status fetched successfully"});
      } else {
        res.status(400).json({data:null,message:"No status uploaded"});
      }
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },

  async getAllStatus(req: Request, res: Response) {
    try {
      const user_id: number = req.user?.user_id as number;
      const userStatusData = await statusService.getAllStatus(user_id);
      res.status(200).json({data:userStatusData,message:"all status fetched successfully"});
    } catch (error) {
      res.status(500).json({ data: null, message: error });
    }
  },
};
