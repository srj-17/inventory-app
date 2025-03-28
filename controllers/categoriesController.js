const {
  getAllCategories,
  addNewCategory,
  getCategoryName,
  updateCategoryName,
} = require("../db/queries");

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

async function getUpdateCategory(req, res) {
  const { categoryId } = req.params;

  res.render("updateCategoryForm", {
    title: "Update category",
    categoryId: categoryId,
  });
}

async function postUpdateCategory(req, res) {
  const { categoryId } = req.params;
  const { categoryName } = req.body;

  updateCategoryName(categoryId, categoryName);
  res.redirect("/");
}

module.exports = {
  getCategories,
  getCreateCategory,
  postCreateCategory,
  getUpdateCategory,
  postUpdateCategory,
};
