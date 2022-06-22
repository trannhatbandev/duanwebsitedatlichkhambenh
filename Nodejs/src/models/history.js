'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, {
        foreignKey: 'patientId',
        targetKey: 'id',
        as: 'patientHistoryData',
      });
      History.belongsTo(models.Doctor_Infor, {
        foreignKey: 'doctorId',
        targetKey: 'doctorId',
        as: 'doctorData',
      });
    }
  }
  History.init(
    {
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'History',
      freezeTableName: true,
    }
  );
  return History;
};
