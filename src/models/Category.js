const CategoryModel = (sequelize, Datatypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: "categories",
    timestamps: false,
  })

  return Category;
}

module.exports = CategoryModel;