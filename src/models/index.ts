import { User } from "./user.model";
import { Otp } from "./otp.model";
import { Group } from "./group.model";
import { Member } from "./group_member_table.model";
import { Chat } from "./chat.model";

export const models = [User, Otp, Group, Member, Chat];

export * from "./user.model"; // optional: re-export for convenience
export * from "./otp.model";
export * from "./group.model";
export * from "./group_member_table.model";
export * from "./chat.model";
