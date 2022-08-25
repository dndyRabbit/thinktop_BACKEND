"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("uangs", {
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
      tgl_uang: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_pengeluaran: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pendapatan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jumlah: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable("uangs");
  },
};
