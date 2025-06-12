import { Member } from "../models";
import { memberRepositories } from "../repositories/member.repositories";

export const memberService = {
  async addUser(group_id: number, member_id: number, admin_id: number) {
    try {
      const data = {
        group_id,
        admin_id,
        user_id: member_id,
      };
      const memberData: Member | false = await memberRepositories.addUser(
        data as Member
      );
      return memberData;
    } catch (error) {
      throw error;
    }
  },
};
