const UserModel = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    displayName: {
      type: Datatypes.STRING,
    },
    email: {
      type: Datatypes.STRING,
      unique: true
    },
    password: {
      type: Datatypes.STRING,
    },
    image: {
      type: Datatypes.STRING,
    }
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true
  })

  return User;
}

module.exports = UserModel;