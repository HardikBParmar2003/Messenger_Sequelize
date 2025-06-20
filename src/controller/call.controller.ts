import { Request, Response } from "express";
import { callService } from "../services/call.service";
import { Call } from "../models";

export const callController = {
  async startCall(req: Request, res: Response) {
    try {
      const caller_id: number = req.user?.user_id as number;
      const receiver_id: number = Number(req.params.receiver_id);
      const call: Call = await callService.startCall(caller_id, receiver_id);
      if (call) {
        res.status(500).json({ data: call, message: "call started" });
      }
    } catch (error: any) {
      res.status(500).json({ data: null, message: error.message });
    }
  },
  async endCall(req: Request, res: Response) {
    try {
      //   const { callId, userId } = req.body as { callId: number; userId: number };
      const user_name: string =
        req.user?.first_name + " " + req.user?.last_name;
      const callId: number = Number(req.params.call_id);
      const call: Call = await callService.endCall(callId, user_name);
      res
        .status(200)
        .json({ data: call, message: "Call ended notification sent" });
    } catch (error: any) {
      res.status(400).json({ data: null, error: error.message });
    }
  },
};
