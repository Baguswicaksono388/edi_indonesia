"use strict";
const { PendidikanTerakhir } = require("../models");

exports.createPendidikanTerakhir = async (req, res) => {
  try {
    const pendidikanTerakhir = await PendidikanTerakhir.create(req.body);
    return res.status(201).json({
      message: "Pendidikan Terakhir created successfully",
      data: pendidikanTerakhir,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const pendidikanTerakhir = await PendidikanTerakhir.update(req.body, {
      where: { id: id },
    });
    if (pendidikanTerakhir[0] === 1) {
      return res.status(200).json({
        message: "Pendidikan Terakhir updated successfully",
      });
    }
    return res.status(404).json({
      message: "Pendidikan Terakhir not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const pendidikanTerakhir = await PendidikanTerakhir.findByPk(id);
    if (pendidikanTerakhir) {
      return res.status(200).json({
        data: pendidikanTerakhir,
      });
    }
    return res.status(404).json({
      message: "Pendidikan Terakhir not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await PendidikanTerakhir.destroy({
      where: { id: id },
    }).then((data) => {
      console.log(data);
      if (data == 1) {
        res.status(200).json({
          message: "Pendidikan Terakhir deleted successfully",
        });
      }

      return res.status(404).json({
        message: "Pendidikan Terakhir not found",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
