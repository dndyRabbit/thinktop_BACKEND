"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hutang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Hutang.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tgl_hutang: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      alasan: DataTypes.TEXT,
      penghutang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "hutangs",
      modelName: "Hutang",
    }
  );
  return Hutang;
};
