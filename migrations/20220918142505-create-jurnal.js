"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("jurnals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nama_akun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nominal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      waktu: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("jurnals");
  },
};
