import cron from "node-cron";
import { userRepository } from "../repositories/user.repositories";

export function expiredOtpDelete() {
  try {
    cron.schedule("* 17 * * *", async () => {
      await userRepository.destroyOtp();
    });
  } catch (error) {
    throw new Error("Error while deleting expired Otp");
  }
}
// 0 0 * * *  (minute 0 hour 0 day of month * month * weekday *(start sunday 0)) ---> means every daya at 12:00 AM midnight