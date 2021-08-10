const express = require("express");
const router = express.Router();

const Term = require("../db/models/Term");

router.get("/", async (req, res, next) => {
  try {
    const terms = await Term.findAll();
    res.send(terms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
