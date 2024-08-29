const express = require("express");
const router = express.Router();
const pendidikanTerakhir = require("../controllers/pendidikanTerakhir.controller");
const { param, body, validationResult } = require("express-validator");
require("dotenv").config();
const auth = require("../middleware/auth.middleware");

const validator = [
  body("id_biodata")
    .not()
    .isEmpty()
    .withMessage("id_biodata is required")
    .isNumeric()
    .withMessage("id_biodata must be a number"),
  body("nama_sekolah").not().isEmpty().withMessage("nama_sekolah is required"),
  body("tahun_mulai")
    .not()
    .isEmpty()
    .withMessage("tahun_mulai is required")
    .isDate()
    .withMessage("tahun_mulai must be a valid date"),
  body("tahun_selesai")
    .not()
    .isEmpty()
    .withMessage("tanggal_lahir is required")
    .isDate()
    .withMessage("tanggal_lahir must be a valid date"),
];

const validatorParams = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number"),
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

router.post(
  "/pendidikan",
  auth.auth,
  validator,
  results,
  pendidikanTerakhir.createPendidikanTerakhir
);
router.delete(
  "/pendidikan/:id",
  auth.auth,
  validatorParams,
  results,
  pendidikanTerakhir.delete
);
router.put(
  "/pendidikan/:id",
  auth.auth,
  validatorParams,
  validator,
  results,
  pendidikanTerakhir.update
);
router.get(
  "/pendidikan/:id",
  auth.auth,
  validatorParams,
  results,
  pendidikanTerakhir.getById
);

module.exports = router;
