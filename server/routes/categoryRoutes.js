const express = require("express");
const router = express.Router();
const Category = require("../db/models/Category");
const Term = require("../db/models/Term");

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const categoryWTerms = await Category.findByPk(req.params.id, {
      include: Term,
    });
    res.send(categoryWTerms);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.send(category);
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const { title, definition, isDefined } = req.body;
    const term = await Term.create({
      title,
      definition,
      isDefined,
      categoryId: req.params.id,
    });
    res.send(term);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
