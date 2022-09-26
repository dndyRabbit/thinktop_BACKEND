const { Jurnal, Akun } = require("../models");
const { Op } = require("sequelize");

const neracaSaldoCtrl = {
  getNeracaSaldoDate: async (req, res) => {
    try {
      const param = req.params;

      const from = new Date(param.year, 0, 01);
      const to = new Date(param.year, 11, 31);

      const response = await Jurnal.findAll({
        where: {
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
      console.log(tempArr);

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

  getDetailNeracaSaldo: async (req, res) => {
    try {
      const param = req.params;

      const month = new Date(param.waktu).getMonth();
      const year = new Date(param.waktu).getFullYear();

      const fromDate = new Date(year, month, 01);
      const toDate = new Date(year, month, 31);

      const response = await Jurnal.findAll({
        include: "akun",
        where: {
          waktu: {
            [Op.between]: [fromDate, toDate],
          },
        },
        order: [["waktu", "DESC"]],
      });

      // CHANGE DATA INTO ACCESSABLE OR COUNTABLE DATA
      const tempArr = response.map((item) => {
        return {
          akun: item.akun.nama_akun,
          kode_akun: item.akun.kode_akun,
          debet: item.tipe === "Debet" ? item.nominal : 0,
          kredit: item.tipe === "Kredit" ? item.nominal : 0,
        };
      });

      //SUM ALL THE DEBET NOMINAL
      const totalDebet = Array.from(
        tempArr.reduce(
          (m, { akun, debet }) => m.set(akun, (m.get(akun) || 0) + debet),
          new Map()
        ),
        ([akun, debet]) => ({ akun, debet })
      );

      //SUM ALL THE KREDIT NOMINAL
      const totalKredit = Array.from(
        tempArr.reduce(
          (m, { akun, kredit }) => m.set(akun, (m.get(akun) || 0) + kredit),
          new Map()
        ),
        ([akun, kredit]) => ({ akun, kredit })
      );

      //Sum All the Debit Nominal
      let tempDataArr = [];
      totalKredit.map((kredit) => {
        totalDebet.map((debet) => {
          if (kredit.akun === debet.akun) {
            tempDataArr.push({
              akun: kredit.akun,
              debet: debet.debet,
              kredit: kredit.kredit,
            });
          }
        });
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
          data: tempDataArr,
          head: ["No", "Nama Akun", "Debet", "Kredit"],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = neracaSaldoCtrl;
