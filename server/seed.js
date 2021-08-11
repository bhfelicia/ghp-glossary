const db = require("./db/db");
const Term = require("./db/models/Term");
const Category = require("./db/models/Category");
const Question = require("./db/models/Question");
const Answer = require("./db/models/Answer");
const User = require("./db/models/User");
require("dotenv").config();

const seed = async () => {
  Category.hasMany(Term);
  Term.belongsTo(Category);

  Question.hasMany(Answer);
  Answer.belongsTo(Question);

  Question.belongsTo(Category);
  Category.hasMany(Question);

  User.hasMany(Question);
  Question.belongsTo(User);

  User.hasMany(Answer);
  Answer.belongsTo(User);

  await db.sync({ force: true });
  const html = await Category.create({
    name: "HTML (HyperText Markup Language)",
  });
  const css = await Category.create({ name: "CSS (Cascading Style Sheets)" });
  const dom = await Category.create({ name: "DOM (Document Object Model)" });
  const node = await Category.create({ name: "Node.js" });
  const express = await Category.create({ name: "Express" });
  const element = await Term.create({
    title: "HTML Element",
    definition:
      "The HTML element is everything from the start tag to the end tag. For example: <h1>My First Heading</h1>",
    isDefined: true,
    categoryId: html.id,
  });
  const user1 = await User.create({
    isAdmin: true,
    email: "felicia@email.com",
    first: "Felicia",
    password: process.env.ADMIN_PASSWORD,
  });
  const question1 = await Question.create({
    inquiry: "Error: Can't set headers after they are sent to the client",
    description:
      "After res.sending data from the back end using express, I am receiving this error. What might be causing this issue?",
    userId: user1.id,
    categoryId: express.id,
  });
  const answer1 = await Answer.create({
    reply:
      "This commonly happens where you may be accidentally res.send-ing more than once from your backend route. Check how you're sending the data back from you express routes and ensure only 1 response can be sent from it.",
    userId: user1.id,
    questionId: question1.id,
  });
};
module.exports = seed;
