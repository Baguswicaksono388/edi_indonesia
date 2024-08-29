"use strict";
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

exports.auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        messsage: "Unauthorized",
      });
    } else {
      const token = authorization.replace("Bearer ", "");
      await jwt.verify(token, secret.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }
        const { id, level_users } = decoded;
        req.userId = id;
        req.leverUsers = level_users;

        next();
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.authAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        messsage: "Unauthorized",
      });
    } else {
      const token = authorization.replace("Bearer ", "");
      await jwt.verify(token, secret.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }

        const { level_users } = decoded;
        req.userId = decoded.id;
        req.leverUsers = level_users;

        if (level_users !== 1) {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }
        next();
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
