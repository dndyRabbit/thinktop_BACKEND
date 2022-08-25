const { Pengeluaran, Sumber } = require("../models");

const pengeluaranCtrl = {
  postPengeluaran: async (req, res) => {
    try {
      const { tgl_pengeluaran, jumlah, uuid_sumber } = req.body;

      const sumber_data = await Sumber.findOne({
        where: { uuid: uuid_sumber },
      });

      const response = await Pengeluaran.create({
        tgl_pengeluaran,
        jumlah,
        id_sumber: sumber_data.id,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Pengeluaran berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getPengeluaran: async (req, res) => {
    try {
      const response = await Pengeluaran.findAll();

      if (!response) {
        return res.status(400).json({
          status: true,
          response: {
            data: response,
          },
          message: "Data pengeluaran tidak ada.",
          error: null,
        });
      }

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Data pengeluaran berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  putPengeluaran: async (req, res) => {
    try {
      const param = req.params;
      const { jumlah } = req.body;

      const response = await Pengeluaran.update(
        { jumlah },
        {
          where: { uuid: param.uuid_pengeluaran },
        }
      );
      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Pengeluaran berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deletePengeluaran: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = pengeluaranCtrl;
