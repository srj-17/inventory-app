const {
  getAllCategories,
  addNewCategory,
  getCategoryName,
  updateCategoryName,
  deleteCategory,
  getItemsWithId,
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
  const categoryName = await getCategoryName(categoryId);

  return res.render("updateCategoryForm", {
    title: "Update category",
    categoryId: categoryId,
    categoryName: categoryName,
  });
}

async function postUpdateCategory(req, res) {
  const { categoryId } = req.params;
  const { categoryName } = req.body;

  updateCategoryName(categoryId, categoryName);
  res.redirect("/");
}

async function postDeleteCategory(req, res) {
  const { categoryId } = req.params;
  const items = await getItemsWithId(categoryId);
  const categories = await getAllCategories();

  if (items.length !== 0) {
    return res.render("categories", {
      title: "Categories",
      categories: categories,
      errors: [{ msg: "Cannot delete category with items in it" }],
    });
  }

  await deleteCategory(categoryId);
  res.redirect("/");
}

module.exports = {
  getCategories,
  getCreateCategory,
  postCreateCategory,
  getUpdateCategory,
  postUpdateCategory,
  postDeleteCategory,
};
