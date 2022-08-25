const { Sumber } = require("../models");

const sumberCtrl = {
  postSumber: async (req, res) => {
    try {
      const { sumber } = req.body;

      const response = await Sumber.create({
        sumber,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Sumber berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  getSumber: async (req, res) => {
    try {
      const response = await Sumber.findAll();

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Data sumber berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  putSumber: async (req, res) => {
    try {
      const param = req.params;
      const { sumber } = req.body;

      if (!param.hasOwnProperty("uuid_sumber")) {
        return res.status(400).json({
          status: true,
          response: null,
          message: "UUID sumber tidak ada.",
          error: null,
        });
      }

      if (sumber == "" || sumber == undefined || sumber == null) {
        res.status(400).json({
          status: false,
          response: {
            data: {
              ...sumber_data.dataValues,
              sumber,
            },
          },
          message: "Sumber tidak memiliki nilai.",
          error: null,
        });
      }

      const sumber_data = await Sumber.findOne({
        where: { uuid: param.uuid_sumber },
      });

      await sumber_data.update({ sumber });

      return res.status(200).json({
        status: true,
        response: {
          data: {
            ...sumber_data.dataValues,
            sumber,
          },
        },
        message: "Sumber berhasil diupdate.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  deleteSumber: async (req, res) => {
    try {
      const param = req.params;

      if (!param.hasOwnProperty("uuid_sumber")) {
        return res.status(400).json({
          status: true,
          response: null,
          message: "UUID sumber tidak ada.",
          error: null,
        });
      }

      const sumber_data = await Sumber.findOne({
        where: { uuid: param.uuid_sumber },
      });

      await sumber_data.destroy();

      return res.status(200).json({
        status: true,
        response: null,
        message: "Sumber berhasil di hapus.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = sumberCtrl;
