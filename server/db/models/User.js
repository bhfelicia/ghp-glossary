const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

class User extends Model {}

User.init(
  {
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    first: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.first} ${this.last}`;
      },
    },
    email: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
  },
  { sequelize: db, modelName: "users" }
);

User.authenticate = async function ({ email, password }) {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
    return token;
  }
  const error = Error("bad credentials");
  error.status = 401;
  throw error;
};

User.byToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findByPk(id);
    if (user) return user;
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.addHook("beforeCreate", async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

module.exports = User;
