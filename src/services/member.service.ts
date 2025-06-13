import { Member } from "../models";
import { memberRepository } from "../repositories/member.repositories";

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


};
