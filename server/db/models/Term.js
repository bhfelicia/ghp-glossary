const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Term extends Model {}

Term.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    definition: {
      type: DataTypes.TEXT,
    },
    isDefined: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "terms" }
);
module.exports = Term;
