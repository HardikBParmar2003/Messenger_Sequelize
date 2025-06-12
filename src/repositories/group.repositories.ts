import { Group } from "../models";

export const groupRepository = {
  async createGroup(data: Group) {
    try {
      return await Group.create(data);
    } catch (error) {
      throw error;
    }
  },
};
