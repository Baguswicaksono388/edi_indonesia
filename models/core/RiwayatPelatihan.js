"use strict";

module.exports = (sequelize, DataType) => {
  const RiwayatPelatihan = sequelize.define(
    "RiwayatPelatihan",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_biodata: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      nama_pelatihan: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      deskripsi_pelatihan: {
        type: DataType.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
      },
    },
    {
      tableName: "riwayat_pelatihan",
    }
  );

  return RiwayatPelatihan;
};
