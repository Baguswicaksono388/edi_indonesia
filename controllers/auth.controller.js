"use strict";
const secret = require("../config/secret");
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    var isValidPassword = function (userpass, password) {
      return bcrypt.compareSync(password, userpass);
    };

    await Users.findOne({
      where: { email: req.body.email },
    }).then(async (data) => {
      if (!data) {
        return res.status(404).json({
          message: "Email Not Found",
        });
      }

      if (!isValidPassword(data.password, req.body.password)) {
        return res.status(404).json({
          message: "Incorrect password",
        });
      } else {
        var token = jwt.sign(
          { id: data.id, level_users: data.level_users },
          secret.secret,
          {
            algorithm: "HS256",
            expiresIn: 60 * 60 * 1,
          }
        );

        return res.status(200).json({
          message: "Success",
          token: token,
          data: {
            id: data.id,
            email: data.email,
          },
        });
      }
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const findUser = await Users.findOne({
      where: { email: req.body.email },
    });
    if (findUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const user = await Users.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      level_users: 2,
    });

    return res.status(200).json({
      message: "User registered successfully",
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
