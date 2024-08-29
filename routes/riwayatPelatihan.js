const express = require("express");
const router = express.Router();
const riwayatPelatihan = require("../controllers/riwayatPelatihan.controller");
const { param, body, validationResult } = require("express-validator");
const auth = require("../middleware/auth.middleware");

const validator = [
  body("id_biodata")
    .not()
    .isEmpty()
    .withMessage("id_biodata is required")
    .isNumeric()
    .withMessage("id_biodata must be a number"),
  body("nama_pelatihan")
    .not()
    .isEmpty()
    .withMessage("nama_pelatihan is required"),
  body("deskripsi_pelatihan")
    .not()
    .isEmpty()
    .withMessage("deskripsi_pelatihan is required"),
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
  "/pelatihan",
  auth.auth,
  validator,
  results,
  riwayatPelatihan.create
);
router.delete(
  "/pelatihan/:id",
  auth.auth,
  validatorParams,
  results,
  riwayatPelatihan.delete
);
router.put(
  "/pelatihan/:id",
  auth.auth,
  validatorParams,
  validator,
  results,
  riwayatPelatihan.update
);
router.get(
  "/pelatihan/:id",
  auth.auth,
  validatorParams,
  results,
  riwayatPelatihan.getById
);

module.exports = router;
