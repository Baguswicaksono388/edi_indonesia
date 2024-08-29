"use strict";

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      level_users: {
        type: DataType.TINYINT(1),
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
      tableName: "users",
    }
  );

  return Users;
};
