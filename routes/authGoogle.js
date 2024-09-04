const express = require("express");
const router = express.Router();
const authGoogleController = require("../controllers/auth.google.controller");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const validator = [
  body("email").not().isEmpty().withMessage("email is required"),
  body("password").not().isEmpty().withMessage("password is required"),
];

const results = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  next();
};

router.get("/google", authGoogleController.googleLogin);
router.get("/google/callback", authGoogleController.googleCallback);

module.exports = router;
