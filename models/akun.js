"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Jurnal }) {
      // define association here
      this.hasMany(Jurnal, { foreignKey: "id_akun", as: "jurnal" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Akun.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nama_akun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kode_akun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "akuns",
      modelName: "Akun",
    }
  );
  return Akun;
};
