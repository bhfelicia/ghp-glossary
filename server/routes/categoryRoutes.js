const express = require("express");
const router = express.Router();
const { Category, Term } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
