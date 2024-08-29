"use strict";

module.exports = (sequelize, DataType) => {
  const RiwayatPekerjaan = sequelize.define(
    "RiwayatPekerjaan",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_biodata: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      nama_perusahaan: {
        type: DataType.STRING,
        allowNull: false,
      },
      posisi: {
        type: DataType.STRING,
        allowNull: false,
      },
      tgl_masuk: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
      tgl_selesai: {
        type: DataType.DATEONLY,
        allowNull: true,
      },
      deskripsi_pekerjaan: {
        type: DataType.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
      },
    },
    {
      tableName: "riwayat_pekerjaan",
    }
  );

  return RiwayatPekerjaan;
};
