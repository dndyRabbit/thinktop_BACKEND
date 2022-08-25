"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pengeluaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sumber }) {
      this.belongsTo(Sumber, { foreignKey: "id_sumber", as: "sumber" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, id_sumber: undefined };
    }
  }
  Pengeluaran.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tgl_pengeluaran: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_sumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "pengeluarans",
      modelName: "Pengeluaran",
    }
  );
  return Pengeluaran;
};
