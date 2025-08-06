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
    await queryInterface.bulkInsert("role_permission_table", [
      {
        role_id: 1,
        permission_id: 1,
        createdAt: "2025-06-26 15:54:10.485+05:30",
        updatedAt: "2025-06-26 15:54:10.485+05:30",
      },
      {
        role_id:1,
        permission_id: 2,
        createdAt: "2025-06-26 15:54:10.485+05:30",
        updatedAt: "2025-06-26 15:54:10.485+05:30",
      },
      {
        role_id: 1,
        permission_id: 3,
        createdAt: "2025-06-26 15:54:10.485+05:30",
        updatedAt: "2025-06-26 15:54:10.485+05:30",
      },
      {
        role_id: 1,
        permission_id: 4,
        createdAt: "2025-06-26 15:54:10.485+05:30",
        updatedAt: "2025-06-26 15:54:10.485+05:30",
      },
      {
        role_id: 1,
        permission_id: 5,
        createdAt: "2025-06-26 15:54:10.485+05:30",
        updatedAt: "2025-06-26 15:54:10.485+05:30",
      },
      {
        role_id: 1,
        permission_id: 6,
        createdAt: "2025-06-26 15:54:10.485+05:30",
        updatedAt: "2025-06-26 15:54:10.485+05:30",
      },
      {
        role_id: 2,
        permission_id: 2,
        createdAt: "2025-06-26 15:54:10.485+05:30",
        updatedAt: "2025-06-26 15:54:10.485+05:30",
      },
      {
        role_id: 2,
        permission_id: 5,
        createdAt: "2025-06-26 15:54:10.485+05:30",
        updatedAt: "2025-06-26 15:54:10.485+05:30",
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete("role_permission_table", null, {});
  },
};
