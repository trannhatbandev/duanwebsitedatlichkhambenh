'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog.belongsTo(models.User, { foreignKey: 'doctorId' });
    }
  }
  Blog.init(
    {
      contentMarkdown: DataTypes.TEXT('long'),
      description: DataTypes.TEXT('long'),
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Blog',
    }
  );
  return Blog;
};
