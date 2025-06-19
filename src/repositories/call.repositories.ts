import { Call, callStatus } from "../models";

export const callReposirory = {
  async createCall(data: Call) {
    try {
      return await Call.create(data);
    } catch (error) {
      throw new Error("Error facing while create call");
    }
  },
  async updateCallStatus(id: number, status: callStatus) {
    try {
      const call = await Call.update(
        { status },
        {
          where: { id },
        }
      );
      if (!call) throw new Error("Call not found");

      return call;
    } catch (error) {
      throw new Error("Error while updating the call");
    }
  },

  async getCallById(callId: number) {
    try {
      return Call.findByPk(callId);
    } catch (error) {
      throw new Error("Error while fetching call details");
    }
  },
};
