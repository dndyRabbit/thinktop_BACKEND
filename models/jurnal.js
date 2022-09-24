"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jurnal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Akun }) {
      // define association here
      this.belongsTo(Akun, { foreignKey: "id_akun", as: "akun" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, id_akun: undefined };
    }
  }
  Jurnal.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nominal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Nominal harus ada." },
          notEmpty: { msg: "Nominal tidak boleh kosong." },
        },
      },
      keterangan: {
        type: DataTypes.STRING,
      },
      tipe: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama akun harus ada." },
          notEmpty: { msg: "Nama akun tidak boleh kosong." },
        },
      },
      waktu: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_akun: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "jurnals",
      modelName: "Jurnal",
    }
  );
  return Jurnal;
};
