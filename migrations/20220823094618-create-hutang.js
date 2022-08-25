"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("hutangs", {
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
    await queryInterface.dropTable("hutangs");
  },
};
