const express = require("express");
const router = express.Router();
const riwayatPekerjaan = require("../controllers/riwayatPekerjaan.controller");
const { param, body, validationResult } = require("express-validator");
const auth = require("../middleware/auth.middleware");

const validator = [
  body("id_biodata")
    .not()
    .isEmpty()
    .withMessage("id_biodata is required")
    .isNumeric()
    .withMessage("id_biodata must be a number"),
  body("nama_perusahaan")
    .not()
    .isEmpty()
    .withMessage("nama_sekolah is required"),
  body("posisi").not().isEmpty().withMessage("posisisi is required"),
  body("tgl_masuk")
    .not()
    .isEmpty()
    .withMessage("tahun_mulai is required")
    .isDate()
    .withMessage("tahun_mulai must be a valid date"),
  body("deskripsi_pekerjaan")
    .not()
    .isEmpty()
    .withMessage("deskripsi_pekerjaan is required"),
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
  "/pekerjaan",
  auth.auth,
  validator,
  results,
  riwayatPekerjaan.create
);
router.delete(
  "/pekerjaan/:id",
  auth.auth,
  validatorParams,
  results,
  riwayatPekerjaan.delete
);
router.put(
  "/pekerjaan/:id",
  auth.auth,
  validatorParams,
  validator,
  results,
  riwayatPekerjaan.update
);
router.get(
  "/pekerjaan/:id",
  auth.auth,
  validatorParams,
  results,
  riwayatPekerjaan.getById
);

module.exports = router;
