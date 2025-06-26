"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("permission_table", [
      {
        permission: "delete_group",
        createdAt: "2025-06-26 13:54:10.485+05:30",
        updatedAt: "2025-06-26 13:54:10.485+05:30",
      },
      {
        permission: "create_group",
        createdAt: "2025-06-26 13:54:10.485+05:30",
        updatedAt: "2025-06-26 13:54:10.485+05:30",
      },
      {
        permission: "add_member",
        createdAt: "2025-06-26 13:54:10.485+05:30",
        updatedAt: "2025-06-26 13:54:10.485+05:30",
      },
      {
        permission: "remove_member",
        createdAt: "2025-06-26 13:54:10.485+05:30",
        updatedAt: "2025-06-26 13:54:10.485+05:30",
      },
      {
        permission: "delete_status",
        createdAt: "2025-06-26 13:54:10.485+05:30",
        updatedAt: "2025-06-26 13:54:10.485+05:30",
      },
      {
        permission: "update_group",
        createdAt: "2025-06-26 13:54:10.485+05:30",
        updatedAt: "2025-06-26 13:54:10.485+05:30",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
