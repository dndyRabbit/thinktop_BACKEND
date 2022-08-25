"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pemasukan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sumber }) {
      // define association here
      this.belongsTo(Sumber, { foreignKey: "id_sumber", as: "sumber" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, id_sumber: undefined };
    }
  }
  Pemasukan.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tgl_pemasukan: {
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
      tableName: "pemasukans",
      modelName: "Pemasukan",
    }
  );
  return Pemasukan;
};
