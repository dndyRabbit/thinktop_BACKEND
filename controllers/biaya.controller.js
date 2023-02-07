const { Biaya, Akun } = require("../models");

const biayaCtrl = {
  postBiaya: async (req, res) => {
    try {
      const { id_akun, deskripsi, jumlah } = req.body;

      const akun_data = await Akun.findOne({ where: { uuid: id_akun } });

      const response = await Biaya.create({
        id_akun: akun_data.id,
        deskripsi,
        jumlah,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Biaya berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getBiaya: async (req, res) => {
    try {
      const response = await Biaya.findAll({
        include: "akun"
      });
      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: ["No", "Deskripsi", "Jumlah", "Aksi"],
        },
        message: "Data biaya berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = biayaCtrl;
