const { Router } = require("express");
// allow the parent router's params to get accessed here
const itemsRouter = Router({ mergeParams: true });

const {
  getItems,
  getCreateItem,
  postCreateItem,
  getUpdateItem,
  postUpdateItem,
  postDeleteItem,
} = require("../controllers/itemsController");

itemsRouter.get("/", getItems);
itemsRouter.get("/create", getCreateItem);
itemsRouter.post("/create", postCreateItem);
itemsRouter.get("/update/:itemId", getUpdateItem);
itemsRouter.post("/update/:itemId", postUpdateItem);
itemsRouter.post("/delete/:itemId", postDeleteItem);

module.exports = itemsRouter;
