const express = require("express");
const router = express.Router();
const biodataControllers = require("../controllers/biodata.controller");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const auth = require("../middleware/auth.middleware");

const validator = [
  body("user_id")
    .not()
    .isEmpty()
    .withMessage("user_id is required")
    .isNumeric()
    .withMessage("user_id must be a number"),
  body("nama").not().isEmpty().withMessage("nama is required"),
  body("alamat").not().isEmpty().withMessage("alamat is required"),
  body("tanggal_lahir")
    .not()
    .isEmpty()
    .withMessage("tanggal_lahir is required")
    .isDate()
    .withMessage("tanggal_lahir must be a valid date"),
  body("tempat_lahir").not().isEmpty().withMessage("tempat_lahir is required"),
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

router.get("/biodata", auth.authAdmin, biodataControllers.getAllBiodata);
router.post(
  "/biodata",
  auth.auth,
  validator,
  results,
  biodataControllers.createBiodata
);
router.get("/biodata/me", auth.auth, biodataControllers.getDetailMe);
router.get("/biodata/:id", auth.authAdmin, biodataControllers.getById);
router.delete("/biodata/:id", auth.authAdmin, biodataControllers.delete);
router.get("/biodata-search", auth.authAdmin, biodataControllers.searchBiodata);

module.exports = router;
