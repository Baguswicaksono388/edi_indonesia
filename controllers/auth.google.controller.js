"use strict";
const { google } = require("googleapis");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
require("dotenv").config;
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

exports.googleLogin = (req, res) => {
  res.redirect(authorizationUrl);
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      return res.json({
        data: data,
      });
    }

    let user = await Users.findOne({
      where: { email: data.email },
    });

    if (!user) {
      user = await Users.create({
        email: data.email,
        level_users: 2,
      });
    }

    var token = jwt.sign(
      { id: user.id, level_users: user.level_users },
      secret.secret,
      {
        algorithm: "HS256",
        expiresIn: 60 * 60 * 1,
      }
    );

    // return res.redirect(`localhost:3000/auth-success?token=${token}`); //jika di FE

    return res.status(200).json({
      message: "Success",
      token: token,
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in Google OAuth" });
  }
};
