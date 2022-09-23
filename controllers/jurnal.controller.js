const { Jurnal } = require("../models");

const jurnalCtrl = {
  postJurnal: async (req, res) => {
    try {
      const { nama_akun, tipe, waktu, keterangan, nominal } = req.body;

      const response = await Jurnal.create({
        nama_akun,
        tipe,
        waktu,
        keterangan,
        nominal,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: ["No", "Waktu", "Aksi"],
        },
        message: "Jurnal berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  getJurnal: async (req, res) => {
    try {
      const query = req.query;

      const response = await Jurnal.findAll({
        where: query?.waktu ? { waktu: query?.waktu } : null,
        order: [["waktu", "DESC"]],
      });
      // console.log(query.waktu)

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data jurnal tidak ada.",
          error: null,
        });
      }

      // Convert all data to dates data
      let tempArr = response.map((item) => {
        return item.waktu;
      });

      // Remove duplicate date from an array
      const DateDatas = [...new Set(tempArr.map((date) => date.toString()))];

      return res.status(200).json({
        status: true,
        response: {
          data: DateDatas,
          head: ["No", "Waktu", "Aksi"],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  getJurnalByDate: async (req, res) => {
    try {
      const param = req.params;

      const response = await Jurnal.findAll({ where: { waktu: param.waktu } });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data jurnal tidak ada.",
          error: null,
        });
      }

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: ["No", "Akun", "Debet", "Kredit", "Aksi"],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  putJurnal: async (req, res) => {
    try {
      const param = req.params;
      const { nominal, keterangan } = req.body;

      const jurnal = await Jurnal.findOne({
        where: { uuid: param.uuid_jurnal },
      });

      if (jurnal.uuid !== param.uuid_jurnal) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data akun tidak ada.",
          error: null,
        });
      }

      await Jurnal.update(
        { nominal, keterangan },
        { where: { uuid: param.uuid_jurnal } }
      );

      return res.status(200).json({
        status: true,
        response: null,
        message: "Jurnal berhasil diubah.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  deleteJurnal: async (req, res) => {
    try {
      const param = req.params;

      const jurnal = await Jurnal.findOne({
        where: {
          uuid: param.uuid_jurnal,
        },
      });

      if (!jurnal) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data akun tidak ada.",
          error: null,
        });
      }

      await jurnal.destroy();

      return res.status(200).json({
        status: true,
        response: null,
        message: "Jurnal berhasil dihapus.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = jurnalCtrl;
