const { Pembelian, Akun, Product } = require("../models");

const pembelianCtrl = {
  postPembelian: async (req, res) => {
    try {
      const { akun, tipe, waktu, quantity, uuid_product } = req.body;

      const akun_data = await Akun.findOne({ where: { uuid: akun } });
      const product_data = await Product.findOne({
        where: { uuid: uuid_product },
      });

      const response = await Pembelian.create({
        id_akun: akun_data.id,
        id_product: product_data.id,
        tipe,
        waktu,
        quantity,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: ["No", "Waktu", "Aksi"],
        },
        message: "Pembelian berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  // getPembelian: async (req, res) => {

  // },

  // putPembelian: async (req, res) => {
  //   try {
  //     const param = req.params;
  //     const { nominal, keterangan } = req.body;

  //     const pembelian = await Pembelian.findOne({
  //       where: { uuid: param.uuid_pembelian },
  //     });

  //     if (!pembelian) {
  //       return res.status(400).json({
  //         status: false,
  //         response: null,
  //         message: "Data akun tidak ada.",
  //         error: null,
  //       });
  //     }

  //     await Pembelian.update(
  //       { nominal, keterangan },
  //       { where: { uuid: param.uuid_pembelian } }
  //     );

  //     return res.status(200).json({
  //       status: true,
  //       response: null,
  //       message: "Pembelian berhasil diubah.",
  //       error: null,
  //     });
  //   } catch (err) {
  //     return res.status(500).send(err);
  //   }
  // },

  // deletePembelian: async (req, res) => {
  //   try {
  //     const param = req.params;

  //     const pembelian = await Pembelian.findOne({
  //       where: {
  //         uuid: param.uuid_pembelian,
  //       },
  //     });

  //     if (!pembelian) {
  //       return res.status(400).json({
  //         status: false,
  //         response: null,
  //         message: "Data akun tidak ada.",
  //         error: null,
  //       });
  //     }

  //     await pembelian.destroy();

  //     return res.status(200).json({
  //       status: true,
  //       response: null,
  //       message: "Pembelian berhasil dihapus.",
  //       error: null,
  //     });
  //   } catch (err) {
  //     return res.status(500).send(err);
  //   }
  // },
};

module.exports = pembelianCtrl;
