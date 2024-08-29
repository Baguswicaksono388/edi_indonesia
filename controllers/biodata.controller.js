"use strict";
const { where } = require("sequelize");
const {
  Biodata,
  PendidikanTerakhir,
  RiwayatPekerjaan,
  RiwayatPelatihan,
} = require("../models");

exports.getAllBiodata = async (req, res) => {
  try {
    Biodata.hasMany(PendidikanTerakhir, { foreignKey: "id_biodata" });
    PendidikanTerakhir.belongsTo(Biodata, { foreignKey: "id_biodata" });

    Biodata.hasMany(RiwayatPekerjaan, { foreignKey: "id_biodata" });
    RiwayatPekerjaan.belongsTo(Biodata, { foreignKey: "id_biodata" });

    Biodata.hasMany(RiwayatPelatihan, { foreignKey: "id_biodata" });
    RiwayatPelatihan.belongsTo(Biodata, { foreignKey: "id_biodata" });

    const biodatas = await Biodata.findAll({
      attributes: ["id", "nama", "alamat", "tanggal_lahir", "tempat_lahir"],
      include: [
        {
          model: PendidikanTerakhir,
        },
        {
          model: RiwayatPekerjaan,
        },
        {
          model: RiwayatPelatihan,
        },
      ],
    });

    return res.status(200).json({
      message: "Success",
      data: biodatas,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.createBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.create(req.body);
    return res.status(201).json({
      message: "Biodata created successfully",
      data: biodata,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDetailMe = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await getDataByPk(userId);
    if (!data) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    return res.status(200).json({
      message: "Success",
      data,
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
    const userId = req.params.id;
    const data = await getDataByPk(userId);
    if (!data) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    return res.status(200).json({
      message: "Success",
      data,
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
    if (req.params.id === req.userId) {
      return res.status(403).json({
        message: "Unauthorized to delete this data",
      });
    }

    await Biodata.findOne({
      where: {
        id: req.params.id,
      },
    }).then(async (data) => {
      if (!data) {
        return res.status(404).json({
          message: "Data not found",
        });
      }

      data.destroy();
      await PendidikanTerakhir.destroy({
        where: { id_biodata: req.params.id },
      });
      await RiwayatPekerjaan.destroy({ where: { id_biodata: req.params.id } });
      await RiwayatPelatihan.destroy({ where: { id_biodata: req.params.id } });
      return res.status(200).json({
        message: "Data deleted successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

async function getDataByPk(id) {
  try {
    Biodata.hasMany(PendidikanTerakhir, { foreignKey: "id_biodata" });
    PendidikanTerakhir.belongsTo(Biodata, { foreignKey: "id_biodata" });

    Biodata.hasMany(RiwayatPekerjaan, { foreignKey: "id_biodata" });
    RiwayatPekerjaan.belongsTo(Biodata, { foreignKey: "id_biodata" });

    Biodata.hasMany(RiwayatPelatihan, { foreignKey: "id_biodata" });
    RiwayatPelatihan.belongsTo(Biodata, { foreignKey: "id_biodata" });

    const biodata = await Biodata.findOne({
      attributes: ["id", "nama", "alamat", "tanggal_lahir", "tempat_lahir"],
      include: [
        {
          model: PendidikanTerakhir,
        },
        {
          model: RiwayatPekerjaan,
        },
        {
          model: RiwayatPelatihan,
        },
      ],
      where: {
        user_id: id,
      },
    });

    return biodata;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
}
