import { User } from "./user.model";
import { Otp } from "./otp.model";
import { Group } from "./group.model";
import { Member } from "./group_member_table.model";
import { Chat } from "./chat.model";
import { Status } from "./status.model";
import { Call } from "./call.model";
import { Role } from "./role.model";
import { Permission } from "./permission.model";
import { RolePermission } from "./rolepermission.model";

export const models = [User, Otp, Group, Member, Chat, Status, Call, Role, Permission, RolePermission];

export * from "./user.model"; // optional: re-export for convenience
export * from "./otp.model";
export * from "./group.model";
export * from "./group_member_table.model";
export * from "./chat.model";
export * from "./status.model";
export * from './call.model';
export * from './role.model';
export * from './permission.model';
export * from './rolepermission.model'