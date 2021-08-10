const express = require("express");
const router = express.Router();
const Question = require("../db/models/Question");
const Answer = require("../db/models/Answer");

router.get("/", async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.send(questions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
