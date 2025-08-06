"use strict";

const { UpdatedAt } = require("sequelize-typescript");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        first_name: "Hardik",
        last_name: "Parmar",
        email: "hardik@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Himat",
        last_name: "Parmar",
        email: "himat@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Mann",
        last_name: "Shah",
        email: "shah@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Umang",
        last_name: "Makwana",
        email: "umang@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },

      {
        first_name: "Jigar",
        last_name: "Kanada",
        email: "jigar@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Darshan",
        last_name: "Chauhan",
        email: "darshan@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Nishit",
        last_name: "Gadhavi",
        email: "nishit@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Keval",
        last_name: "Joshi",
        email: "keval@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Vaibhav",
        last_name: "Parmar",
        email: "vaibhav@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Vivek",
        last_name: "Dabhi",
        email: "vivek@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Vishal",
        last_name: "Makwana",
        email: "vishal@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },

      {
        first_name: "Rushi",
        last_name: "Bhatti",
        email: "rushi@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Bhargav",
        last_name: "HirvaniKanda",
        email: "bhargav@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Aditya",
        last_name: "Nair",
        email: "aditya@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
      },
      {
        first_name: "Om",
        last_name: "Sonani",
        email: "om@gmail.com",
        profile_photo:
          "https://res.cloudinary.com/duy1xfupo/image/upload/v1750395523/hardik/tzeafcd1ik2ldozmlqb3.jpg",
        password:
          "$2b$10$BkdSrx6w5t7AhkfOJQ/ze.Lm6IbCgw0Qemu7ajxDVNtSlm9eLZfXu",
        createdAt: "2025-06-25 11:10:28.359+05:30",
        updatedAt: "2025-06-25 11:10:28.359+05:30",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
