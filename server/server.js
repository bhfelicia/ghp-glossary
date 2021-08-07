const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

const seed = require("./db/seed");

seed();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
