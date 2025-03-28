const { Router } = require("express");
const categoriesRouter = Router();

const {
  getCategories,
  getCreateCategory,
  postCreateCategory,
  getUpdateCategory,
  postUpdateCategory,
} = require("../controllers/categoriesController");

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/create", getCreateCategory);
categoriesRouter.post("/create", postCreateCategory);
// matches styles.css as well, why? idk
categoriesRouter.get("/update/:categoryId", getUpdateCategory);
categoriesRouter.post("/update/:categoryId", postUpdateCategory);

module.exports = categoriesRouter;
