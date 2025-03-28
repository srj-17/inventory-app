const { Router } = require("express");
const categoriesRouter = Router();

const {
  getCategories,
  getCreateCategory,
  postCreateCategory,
} = require("../controllers/categoriesController");

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/create", getCreateCategory);
categoriesRouter.post("/create", postCreateCategory);

module.exports = categoriesRouter;
