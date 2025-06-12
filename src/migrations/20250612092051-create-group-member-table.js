"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("group_member_table", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "group_table",
          key: "group_id",
        },
      },

      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("group_member_table");
  },
};
