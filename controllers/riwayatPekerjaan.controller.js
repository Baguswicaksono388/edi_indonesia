"use strict";
const { RiwayatPekerjaan } = require("../models");

exports.create = async (req, res) => {
  try {
    const riwayatPekerjaan = await RiwayatPekerjaan.create(req.body);
    return res.status(201).json({
      message: "Riwayat pekerjaan created successfully",
      data: riwayatPekerjaan,
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
    const id = req.params.id;
    const riwayatPekerjaan = await RiwayatPekerjaan.findOne({
      where: { id: id },
    });
    if (!riwayatPekerjaan) {
      return res.status(404).json({
        message: "Riwayat pekerjaan not found",
      });
    }
    return res.status(200).json({
      message: "Success",
      data: riwayatPekerjaan,
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
    const id = req.params.id;
    const riwayatPekerjaan = await RiwayatPekerjaan.update(req.body, {
      where: { id: id },
    });

    if (riwayatPekerjaan[0] === 1) {
      return res.status(200).json({
        message: "Riwayat pekerjaan updated successfully",
      });
    }

    return res.status(404).json({
      message: "Riwayat pekerjaan not found",
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
    const id = req.params.id;
    const riwayatPekerjaan = await RiwayatPekerjaan.destroy({
      where: { id: id },
    });
    if (riwayatPekerjaan === 1) {
      return res.status(200).json({
        message: "Riwayat pekerjaan deleted successfully",
      });
    }
    return res.status(404).json({
      message: "Riwayat pekerjaan not found",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
