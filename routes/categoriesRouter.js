const { Router } = require("express");
const categoriesRouter = Router();

const {
  getCategories,
  getCreateCategory,
  postCreateCategory,
  getUpdateCategory,
  postUpdateCategory,
  postDeleteCategory,
} = require("../controllers/categoriesController");

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/create", getCreateCategory);
categoriesRouter.post("/create", postCreateCategory);
categoriesRouter.get("/update/:categoryId", getUpdateCategory);
categoriesRouter.post("/update/:categoryId", postUpdateCategory);
categoriesRouter.post("/delete/:categoryId", postDeleteCategory);

module.exports = categoriesRouter;
