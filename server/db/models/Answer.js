const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Answer extends Model {}

Answer.init(
  {
    reply: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize: db, modelName: "answers" }
);

module.exports = Answer;
