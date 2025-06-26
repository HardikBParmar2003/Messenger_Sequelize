"use strict";

const { UpdatedAt } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert("role_table", [
      {
        role: "admin",
        createdAt:'2025-06-26 13:53:19.485+05:30',
        updatedAt:'2025-06-26 13:53:19.485+05:30'
      },{
        role: "user",
        createdAt:'2025-06-26 13:54:10.485+05:30',
        updatedAt:'2025-06-26 13:54:10.485+05:30'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_table', null, {});
  },
};
