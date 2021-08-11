const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

const User = require("../db/models/User");

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

router.use(express.json());

router.post("/admin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await User.authenticate({ email, password });
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

router.get("/admin", async (req, res, next) => {
  try {
    const userByToken = await User.byToken(req.headers.authorization);
    res.send(userByToken);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
