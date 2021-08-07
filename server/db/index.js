const Category = require("./models/Category");
const Term = require("./models/Term");

Category.hasMany(Term);
Term.belongsToMany(Category, { through: "Category_Term" });

module.exports = { Category, Term };
