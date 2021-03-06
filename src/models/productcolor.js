"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductColor.belongsTo(models.Product, {
        foreignKey: "productId"
      });
    }
  }
  ProductColor.init({
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    hexa: DataTypes.STRING,
    status: DataTypes.STRING,
    isPrimary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: "ProductColor",
  });
  return ProductColor;
};