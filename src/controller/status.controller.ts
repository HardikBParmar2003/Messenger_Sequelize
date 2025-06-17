import { Request, Response } from "express";
import { statusService } from "../services/status.service";
export const statusController = {
  async uploadStatus(req: Request, res: Response) {
    try {
      const description: string = req.body.description;
      const file: string = req.file?.path as string || req.body.status;
      const id: number = req.user?.user_id as number;
      const statusData = await statusService.uploadStatus(
        description,
        file,
        id
      );
      res.json(statusData);
    } catch (error) {
        res.status(500).json({ error: "Error while uploading status" });    }
  },

  async deleteStatus(req: Request, res: Response) {
    try {
      const user_id = req.user?.user_id as number;
      const status_id: number = Number(req.params.status_id);
      const statusData = await statusService.deleteStatus(user_id, status_id);
      res.json(statusData)
    } catch (error) {
        throw new Error("Error while deleting status")
    }
  },
};
