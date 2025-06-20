import { group } from "console";
import { Group, Member } from "../models";
import { memberRepository } from "../repositories/member.repositories";
import { groupRepository } from "../repositories/group.repositories";

export const memberService = {
  async addUser(group_id: number, member_id: number, admin_id: number) {
    try {
      const data = {
        group_id,
        admin_id,
        user_id: member_id,
      };
      const memberData: Member | false = await memberRepository.addUser(
        data as Member
      );
      return memberData;
    } catch (error) {
      throw new Error("Error while adding this member to group");
    }
  },

  async removeUser(user_id: number, group_id: number) {
    try {
      const userData = await memberRepository.getUser(user_id, group_id);
      if (userData) {
        const admin_id: number = userData?.admin_id as number;
        if (user_id == admin_id) {
          const memberData: Member[] = await memberRepository.findAllUser(
            group_id
          );
          if (memberData.length > 1) {
            const data = {
              user_id: memberData[1].user_id,
            };
            await groupRepository.updateGroupData(data as Group, group_id);
            const updatedMemberData = {
              admin_id: memberData[1].user_id,
            };
            await memberRepository.updateMemberData(
              updatedMemberData as Member,
              group_id
            );
            return await memberRepository.removeUser(user_id, group_id);
          } else {
            const data = await memberRepository.removeUser(user_id, group_id);
            await groupRepository.deleteGroup(group_id);
            return data;
          }
        } else {
          return await memberRepository.removeUser(user_id, group_id);
        }
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error while remove user from group");
    }
  },
};
