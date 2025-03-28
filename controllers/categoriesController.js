const { getAllCategories, addNewCategory } = require("../db/queries");

async function getCategories(req, res) {
  const categories = await getAllCategories();

  res.render("categories", {
    categories: categories,
    title: "Inventory: Categories",
  });
}

function getCreateCategory(req, res) {
  res.render("categoryForm", { title: "Create New Category" });
}

async function postCreateCategory(req, res) {
  const { categoryName } = req.body;
  await addNewCategory(categoryName);

  res.redirect("/");
}

async function postCreateItem(req, res) {
  const { itemName } = req.body;
  const { categoryId } = req.params;
  await addNewItem(categoryId, itemName);

  res.redirect(`/${categoryId}/items`);
}

module.exports = {
  getCategories,
  getCreateCategory,
  postCreateCategory,
};
