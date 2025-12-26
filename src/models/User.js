const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    displayName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true
  })

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: "user_id", as: "blog_posts"
    })
  }

  return User;
}

module.exports = UserModel;