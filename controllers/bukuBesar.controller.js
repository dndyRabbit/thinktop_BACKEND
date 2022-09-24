const { Jurnal, Akun } = require("../models");
const { Op } = require("sequelize");

const bukuBesarCtrl = {
  getAkunData: async (req, res) => {
    try {
      const param = req.params;

      const from = new Date(param.year, 0, 01);
      const to = new Date(param.year, 11, 31);

      const akun_data = await Akun.findOne({
        where: { uuid: param.uuid_akun },
      });

      const response = await Jurnal.findAll({
        where: {
          id_akun: akun_data.id,
          waktu: {
            [Op.between]: [from, to],
          },
        },
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data jurnal tidak ada.",
          error: null,
        });
      }

      // Convert all data to dates 1D array data
      let tempArr = response.map((item) => {
        return {
          month: new Date(item.waktu).getMonth().toString(),
          year: new Date(item.waktu).getFullYear().toString(),
        };
      });

      const tempDatas = [];
      //Remove Duplicates Item
      tempArr.map((x) =>
        tempDatas.filter((a) => a.month == x.month).length > 0
          ? null
          : tempDatas.push(x)
      );

      const dateDatas = tempDatas.map((item, index) => {
        return new Date(item.year, item.month, 01);
      });

      return res.status(200).json({
        status: true,
        response: {
          data: dateDatas,
          head: ["No", "Waktu", "Aksi"],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  getAkunDataByDate: async (req, res) => {
    try {
      const param = req.params;

      const month = new Date(param.waktu).getMonth();
      const year = new Date(param.waktu).getFullYear();

      const fromDate = new Date(year, month, 01);
      const toDate = new Date(year, month, 31);

      const akun_data = await Akun.findOne({
        where: { uuid: param.uuid_akun },
      });

      const response = await Jurnal.findAll({
        where: {
          id_akun: akun_data.id,
          waktu: {
            [Op.between]: [fromDate, toDate],
          },
        },
        order: [["waktu", "DESC"]],
      });

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
          head: ["No", "Waktu Transaksi", "Keterangan", "Debet", "Kredit"],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = bukuBesarCtrl;
