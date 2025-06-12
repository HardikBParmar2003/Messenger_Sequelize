import { User, Group } from "../models";
// import { Group } from "../models/group";

export const groupRepository = {
  async createGroup(data: Group) {
    try {
        console.log("group data is",data);
      return await Group.create(data);
    } catch (error) {
        throw error
    }
  },
};
