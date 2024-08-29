"use strict";
const { RiwayatPelatihan } = require("../models");

exports.create = async (req, res) => {
  try {
    const riwayatPelatihan = await RiwayatPelatihan.create(req.body);
    return res.status(201).json({
      message: "Riwayat Pelatihan created successfully",
      data: riwayatPelatihan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const riwayatPelatihan = await RiwayatPelatihan.findByPk(req.params.id);
    if (!riwayatPelatihan) {
      return res.status(404).json({
        message: "Riwayat Pelatihan not found",
      });
    }
    return res.status(200).json({
      data: riwayatPelatihan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const riwayatPelatihan = await RiwayatPelatihan.update(req.body, {
      where: { id: req.params.id },
    });

    if (riwayatPelatihan[0] === 0) {
      return res.status(404).json({
        message: "Riwayat Pelatihan not found",
      });
    }

    return res.status(200).json({
      message: "Riwayat Pelatihan updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const riwayatPelatihan = await RiwayatPelatihan.destroy({
      where: { id: req.params.id },
    });

    if (riwayatPelatihan === 0) {
      return res.status(404).json({
        message: "Riwayat Pelatihan not found",
      });
    }

    return res.status(200).json({
      message: "Riwayat Pelatihan deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
