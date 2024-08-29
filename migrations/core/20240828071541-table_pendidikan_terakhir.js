"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pendidikan_terakhir", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_biodata: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nama_sekolah: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tahun_mulai: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tahun_selesai: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pendidikan_terakhir");
  },
};
