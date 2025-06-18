import cron from "node-cron";
import { statusRepository } from "../repositories/status.repository";

export function statusDelete() {
  try {
    cron.schedule("* 17 * * *", async () => {
      await statusRepository.expiredStatusDelete();
    });
  } catch (error) {
    throw new Error("Error while deleting expired staus");
  }
}


// 0 0 * * *  (minute 0 hour 0 day of month * month * weekday *(start sunday 0)) ---> means every daya at 12:00 AM midnight