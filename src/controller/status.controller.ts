import { Request, Response } from "express";
import { statusService } from "../services/status.service";
import { Status } from "../models";
import { Err } from "joi";

export const statusController = {
  async uploadStatus(req: Request, res: Response) {
    try {
      console.log("hello");
      const description: string = req.body?.description;
      console.log(req.file);
      const file: string = (req.file?.path as string) || req.body?.status;
      const id: number = req.user?.user_id as number;
      console.log("object", description, file);

      if (description || file) {
        console.log("object", description, file);
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
      console.log(error);
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
      const statusData: Status[] = await statusService.getUserStatus(user_id);
      if (statusData.length > 0) {
        res
          .status(200)
          .json({ data: statusData, message: "Status fetched successfully" });
      } else {
        res.status(204).json({ data: null, message: "No status uploaded" });
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
        res.status(204).json({ data: null, message: "No status to show" });
      }
    } catch (error) {
      console.log("error is", error);
      res.status(500).json({ data: null, message: error });
    }
  },
};
