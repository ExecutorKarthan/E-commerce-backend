//Import libraries
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create the ProductTag module
class ProductTag extends Model {}

//Define attributes for the ProductTag module
ProductTag.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id:{
      type: DataTypes.INTEGER,
      references:{
        model: 'product',
        key: 'id',
      }
    },
    tag_id:{
      type: DataTypes.INTEGER,
      references:{
        model: 'tag',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
