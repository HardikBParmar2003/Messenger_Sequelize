import { Request, Response } from "express";
import { statusService } from "../services/status.service";
import { Status } from "../models";
import { statusDelete } from "../cron/statusDelete";
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
      res.json(statusData);
    } catch (error) {
      res.status(500).json({ error: "Error while uploading status" });
    }
  },

  async deleteStatus(req: Request, res: Response) {
    try {
      const user_id = req.user?.user_id as number;
      const status_id: number = Number(req.params.status_id);
      const statusData: number = await statusService.deleteStatus(
        user_id,
        status_id
      );
      res.json(statusData);
    } catch (error) {
      throw new Error("Error while deleting status");
    }
  },

  async getUserStatus(req: Request, res: Response) {
    try {
      const user_id: number = Number(req.params.user_id);
      const statusData: Status[] = await statusService.getUserStatus(user_id);
      if (statusData.length > 0) {
        res.json(statusData);
      } else {
        res.json("No status uploaded");
      }
    } catch (error) {
      throw new Error("Error while fetching user status");
    }
  },

  async getAllStatus(req:Request,res:Response){
    try {
      const user_id:number = req.user?.user_id as number
      const userStatusData = await statusService.getAllStatus(user_id)
      res.json(userStatusData)
    } catch (error) {
      throw new Error("Error while fetching all user status")
      
    }
  }
};
