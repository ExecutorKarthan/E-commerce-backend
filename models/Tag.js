//Import libraries
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

//Create the Tag model
class Tag extends Model {}

//Define attributes for the tag module
Tag.init(
  {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name:{
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
