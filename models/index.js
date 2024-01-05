// import models
const sequelize = require('../config/connection');
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo category using 'category_id' as a key
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})
// Categories have many Products using 'category_id' as a ke
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through:{
    model: ProductTag,
    unique: false,
    },
    as: 'productToTag'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through:{
    model: ProductTag,
    unique: false,
    },
    as: 'tagToProduct'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
