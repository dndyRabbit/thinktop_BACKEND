const { Pemasukan, Sumber } = require("../models");

const pemasukanCtrl = {
  postPemasukan: async (req, res) => {
    try {
      const { tgl_pemasukan, jumlah, uuid_sumber } = req.body;

      const sumber = await Sumber.findOne({ where: { uuid: uuid_sumber } });

      if (!sumber) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data sumber tidak ada.",
          error: null,
        });
      }

      const response = await Pemasukan.create({
        id_sumber: sumber.id,
        tgl_pemasukan,
        jumlah,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Pemasukan berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getPemasukan: async (req, res) => {
    try {
      const response = await Pemasukan.findAll({ include: "sumber" });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data pemasukan tidak ada.",
          error: null,
        });
      }

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Data pemasukan berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  putPemasukan: async (req, res) => {
    try {
      const param = req.params;
      const { jumlah } = req.body;

      const pemasukan = await Pemasukan.findOne({
        include: "sumber",
        where: { uuid: param.uuid_pemasukan },
      });

      if (pemasukan.uuid !== param.uuid_pemasukan) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data pemasukan tidak ada.",
          error: null,
        });
      }

      await Pemasukan.update(
        { jumlah },
        { where: { uuid: param.uuid_pemasukan } }
      );

      return res.status(200).json({
        status: true,
        response: null,
        message: "Pemasukan berhasil diubah.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deletePemasukan: async (req, res) => {
    try {
      const param = req.params;

      const pemasukan = await Pemasukan.findOne({
        include: "sumber",
        where: { uuid: param.uuid_pemasukan },
      });

      if (pemasukan.uuid !== param.uuid_pemasukan) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data pemasukan tidak ada.",
          error: null,
        });
      }

      await pemasukan.destroy();

      return res.status(200).json({
        status: true,
        response: null,
        message: "Pemasukan berhasil dihapus.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = pemasukanCtrl;
