'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('group_member_table','role_id',{
      type:Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:'role_table',
        key:'role_id'
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('group_member_table','role_id')
  }
};
