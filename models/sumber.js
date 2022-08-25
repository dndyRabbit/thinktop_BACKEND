"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pemasukan }) {
      // define association here
      this.hasMany(Pemasukan, { foreignKey: "id_sumber", as: "pemasukan" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Sumber.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      sumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "sumbers",
      modelName: "Sumber",
    }
  );
  return Sumber;
};
