// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

//Product
Product.belongsTo(Category, {
  foreignkey: "category_id",
});
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
});

//Category
Category.hasMany(Product, {
  foreignKey: "category_id",
});

//Tag
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignkey: "tag_id",
});

//ProductTag

ProductTag.belongsTo(Product, {
  foreignKey: "product_id",
});

ProductTag.belongsTo(Tag, {
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
