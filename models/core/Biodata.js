"use strict";

module.exports = (sequelize, DataType) => {
  const Biodata = sequelize.define(
    "Biodata",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      nama: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      alamat: {
        type: DataType.TEXT,
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
      tempat_lahir: {
        type: DataType.STRING(255),
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
      tableName: "biodata",
    }
  );

  return Biodata;
};
