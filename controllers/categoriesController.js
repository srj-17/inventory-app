const { body, validationResult } = require("express-validator");

const {
  getAllCategories,
  addNewCategory,
  getCategoryName,
  updateCategoryName,
  deleteCategory,
  getItemsWithId,
} = require("../db/queries");

const categoryValidator = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category Name shouldn't be empty"),
];

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

const postCreateCategory = [
  categoryValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("categoryForm", {
        title: "Create New Category",
        errors: errors.array(),
      });
    }

    const { categoryName } = req.body;
    await addNewCategory(categoryName);

    res.redirect("/");
  },
];

async function getUpdateCategory(req, res) {
  const { categoryId } = req.params;
  const categoryName = await getCategoryName(categoryId);

  return res.render("updateCategoryForm", {
    title: "Update category",
    categoryId: categoryId,
    categoryName: categoryName,
  });
}

const postUpdateCategory = [
  categoryValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateCategoryForm", {
        title: "Update category",
        categoryId: categoryId,
        categoryName: categoryName,
        errors: errors,
      });
    }

    const { categoryId } = req.params;
    const { categoryName } = req.body;

    updateCategoryName(categoryId, categoryName);
    res.redirect("/");
  },
];

async function postDeleteCategory(req, res) {
  const { categoryId } = req.params;
  const { pass } = req.body;
  const items = await getItemsWithId(categoryId);

  if (items.length !== 0) {
    return res.render("deleteCategoryConfirmation", {
      categoryId: categoryId,
      title: "Confirm Category Deletion",
      errors: [{ msg: "Cannot delete category with items in it" }],
    });
  }

  if (pass === "supersecretpassword") {
    await deleteCategory(categoryId);
    return res.redirect("/");
  }

  return res.render("deleteCategoryConfirmation", {
    categoryId: categoryId,
    title: "Confirm Category Deletion",
    errors: [{ msg: "Wrong admin password" }],
  });
}

function getDeleteCategory(req, res) {
  const { categoryId } = req.params;
  res.render("deleteCategoryConfirmation", {
    title: "Confirm category deletion",
    categoryId: categoryId,
  });
}

module.exports = {
  getCategories,
  getCreateCategory,
  postCreateCategory,
  getUpdateCategory,
  postUpdateCategory,
  postDeleteCategory,
  getDeleteCategory,
};
