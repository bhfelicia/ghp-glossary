const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

const seed = require("./seed");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/categories", require("./routes/categoryRoutes"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await seed();
  console.log(`Server listening on port ${port}`);
});
