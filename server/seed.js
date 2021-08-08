const db = require("./db/db");
const Term = require("./db/models/Term");
const Category = require("./db/models/Category");

const seed = async () => {
  Category.hasMany(Term);
  Term.belongsTo(Category);
  await db.sync({ force: true });
  const html = await Category.create({
    name: "HTML (HyperText Markup Language)",
  });
  const css = await Category.create({ name: "CSS (Cascading Style Sheets)" });
  const dom = await Category.create({ name: "DOM (Document Object Model)" });
  const node = await Category.create({ name: "Node.js" });
  const element = await Term.create({
    title: "HTML Element",
    definition:
      "The HTML element is everything from the start tag to the end tag. For example: <h1>My First Heading</h1>",
    isDefined: true,
    categoryId: html.id,
  });
};
module.exports = seed;
