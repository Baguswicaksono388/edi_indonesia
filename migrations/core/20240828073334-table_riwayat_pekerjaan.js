"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("riwayat_pekerjaan", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_biodata: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nama_perusahaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      posisi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tgl_masuk: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tgl_selesai: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      deskripsi_pekerjaan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("riwayat_pekerjaan");
  },
};
