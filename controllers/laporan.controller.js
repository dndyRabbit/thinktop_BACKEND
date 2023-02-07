const moment = require("moment");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { Pembelian, Akun, Product, Biaya } = require("../models");

const laporanCtrl = {
  getLaporanHarianWaktu: async (req, res) => {
    try {
      const param = req.params;

      const month = new Date(param.waktu).getMonth();
      const year = new Date(param.waktu).getFullYear();

      const from = new Date(year, month, 01);
      const to = new Date(year, month, 31);

      const response = await Pembelian.findAll({
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
          message: "Data Pembelian tidak ada.",
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
        message: "Data Pembelian berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanHarianData: async (req, res) => {
    try {
      const param = req.params;

      const response = await Pembelian.findAll({
        include: ["akun", "product"],
        where: { waktu: param.waktu },
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
          head: [
            "No",
            "Produk",
            "Harga",
            "Quantity",
            "Total Harga",
            "Pembayaran",
            "Akun",
            "Aksi",
          ],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanBulananWaktu: async (req, res) => {
    try {
      const param = req.params;

      const from = new Date(param.year, 0, 01);
      const to = new Date(param.year, 11, 31);

      const response = await Pembelian.findAll({
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
          message: "Data pembelian tidak ada.",
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
        message: "Data pembelian berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanBulananData: async (req, res) => {
    try {
      const param = req.params;

      const month = new Date(param.waktu).getMonth();
      const year = new Date(param.waktu).getFullYear();

      const fromDate = new Date(year, month, 01);
      const toDate = new Date(year, month, 31);

      const response = await Pembelian.findAll({
        include: ["akun", "product"],
        where: {
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
          head: [
            "No",
            "Tanggal",
            "Produk",
            "Harga",
            "Quantity",
            "Total Harga",
            "Pembayaran",
            "Akun",
            "Aksi",
          ],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanTahunanWaktu: async (req, res) => {
    try {
      const response = await Pembelian.findAll({
        include: ["akun", "product"],
        order: [["waktu", "DESC"]],
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data pembelian tidak ada.",
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
        tempDatas.filter((a) => a.year == x.year).length > 0
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
        message: "Data pembelian berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanTahunanData: async (req, res) => {
    try {
      const param = req.params;
      const year = new Date(param.waktu).getFullYear();

      const fromDate = new Date(year, 01, 01);
      const toDate = new Date(year, 11, 31);

      const response = await Pembelian.findAll({
        include: ["akun", "product"],
        where: {
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
          head: [
            "No",
            "Tanggal",
            "Produk",

            "Harga",
            "Quantity",
            "Total Harga",
            "Pembayaran",
            "Akun",
            "Aksi",
          ],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanLabaRugi: async (req, res) => {
    try {
      const param = req.query;
      const from = new Date(param.awal);
      const to = new Date(param.akhir);

      const response = await Akun.findAll({
        include: [
          {
            model: Biaya,
            as: "biaya",
            required: false,
            where: {
              updatedAt: {
                [Op.between]: [from, to],
              },
            },
          },
          {
            model: Pembelian,
            as: "pembelian",
            required: false,
            where: {
              waktu: {
                [Op.between]: [from, to],
              },
            },
            include: [
              {
                model: Product,
                required: true,
                as: "product",
              },
            ],
          },
        ],
        where: {
          [Op.or]: [
            {
              kategori: "revenue",
            },
            {
              kategori: "operational_expense",
            },
            {
              kategori: "cost_of_sales",
            },
          ],
        },
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (errors) {
      console.log(errors, "ERRORS??");
      return res.status(500).send(errors);
    }
  },
  getSummaryDashboard: async (req, res) => {
    try {
      const nowDate = moment(new Date()).format("YYYY-MM-DD");
      const years = moment(nowDate).year();
      const month = moment(nowDate).month();
      const date = moment(nowDate).date();
      const from = moment(new Date(years, month, "01"));
      const to = moment(new Date(years, month, date));

      const dataBiaya = await Biaya.findAll({
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      const dataPembelian = await Pembelian.findAll({
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      let label = [];
      let value = [];
      for (let i = 1; i < date; i++) {
        let _labelDate = moment(new Date(years, month, i)).format("DD MMM");
        label.push(_labelDate);
      }
      for (let i = 0; i < label.length; i++) {
        const valueLabel = label[i];
        let count = 0;
        for (let j = 0; j < dataPembelian.length; j++) {
          const valuePembelian = dataPembelian[j];
          let _newDate = moment(valuePembelian.updatedAt).format("DD MMM");
          if (_newDate === valueLabel) count++;
        }
        value.push(count);
      }

      return res.status(200).json({
        status: true,
        response: {
          dataPembelian,
          dataBiaya,
          pembelian: {
            chartData: {
              label,
              data: value,
            },
            count: dataPembelian.length,
          },
          transaksi: dataPembelian.length + dataBiaya.length,
        },
        message: "Data dashboard berhasil diambil.",
        error: null,
      });
    } catch (errors) {
      return res.status(500).send(errors);
    }
  },
  getLaporan: async (req, res) => {
    try {
      const query = req.query;
      const { bulan = null, tahun = null } = req.query;

      const nowDate = moment(new Date()).format("YYYY-MM-DD");
      const years = moment(nowDate).year();
      const month = moment(nowDate).month();
      const date = moment(nowDate).date();
      const from = moment(
        new Date(tahun ?? years, bulan == "" ? 0 : bulan, "01")
      );
      const to = moment(new Date(tahun ?? years, month, date));

      let dataPembelian = await Pembelian.findAll({
        include: ["akun", "product"],
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        }
      });

      let dataBiaya = await Biaya.findAll({
        include: ["akun"],
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      return res.status(200).json({
        status: true,
        response: {
          data: [...dataPembelian, ...dataBiaya],
        },
        message: "Data Pembelian berhasil diambil.",
        error: null,
      });
    } catch (errors) {
      return res.status(500).send(errors);
    }
  },
};

module.exports = laporanCtrl;
