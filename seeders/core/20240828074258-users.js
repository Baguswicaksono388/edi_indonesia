"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          email: "admin@gmail.com",
          password: bcrypt.hashSync("admin123", bcrypt.genSaltSync(10)),
          level_users: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
