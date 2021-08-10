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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id, {
      include: Answer,
    });
    res.send(question);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
