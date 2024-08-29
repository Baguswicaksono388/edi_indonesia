"use strict";

module.exports = (sequelize, DataType) => {
  const PendidikanTerakhir = sequelize.define(
    "PendidikanTerakhir",
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
      nama_sekolah: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      jenjang_sekolah: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      tahun_mulai: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
      tahun_selesai: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: DataType.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "pendidikan_terakhir",
    }
  );

  return PendidikanTerakhir;
};
