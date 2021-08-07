const db = require("./db");
const { Term, Category } = require("./index");

const seed = async () => {
  await db.sync({ force: true });
  const html = await Category.create({
    name: "HTML (HyperText Markup Language",
  });
  const css = await Category.create({ name: "CSS (Cascading Style Sheets" });
  const dom = await Category.create({ name: "DOM (Document Object Model" });
  const node = await Category.create({ name: "Node.js" });
};
module.exports = seed;
