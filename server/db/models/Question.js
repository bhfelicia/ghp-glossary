const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Question extends Model {}

Question.init(
  {
    inquiry: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isAnswered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "questions" }
);

module.exports = Question;
