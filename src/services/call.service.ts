import { Call, callStatus, User } from "../models";
import { callReposirory } from "../repositories/call.repositories";
import { userRepository } from "../repositories/user.repositories";
import { callWebSocket } from "../webSocket/webSignal";
export const callService = {
  async startCall(caller_id: number, receiver_id: number) {
    try {
      const callerData: User | null = await userRepository.getIndividualUser(
        caller_id
      );
      const receiverData: User | null = await userRepository.getIndividualUser(
        receiver_id
      );
      const caller: string =
        callerData?.first_name + " " + callerData?.last_name;
      const receiver: string =
        receiverData?.first_name + " " + receiverData?.last_name;
      if (!callerData) throw new Error("Caller not found");
      if (!receiverData) throw new Error("Receiver not found");

      const data = {
        caller_id,
        receiver_id,
      };

      const callData = await callReposirory.createCall(data as Call);

      const notified = callWebSocket.notifyIncomingCall(receiver_id, caller);
      if (!notified) throw new Error("Receiver is not online");

      return callData;
    } catch (error) {
      throw new Error("Something went wrong when try to establish call");
    }
  },
  async endCall(callId: number, user_name: string) {
    const call = await callReposirory.getCallById(callId);
    if (!call) throw new Error("Call not found");
    let status: string = "ended";

    await callReposirory.updateCallStatus(callId, status as callStatus);

    callWebSocket.notifyCallEnded(call.caller_id, user_name);
    callWebSocket.notifyCallEnded(call.receiver_id, user_name);

    return call;
  },
};
