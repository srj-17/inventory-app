const { Router } = require("express");
// allow the parent router's params to get accessed here
const itemsRouter = Router({ mergeParams: true });

const {
  getItems,
  getCreateItem,
  postCreateItem,
} = require("../controllers/itemsController");

itemsRouter.get("/", getItems);
itemsRouter.get("/create", getCreateItem);
itemsRouter.post("/create", postCreateItem);

module.exports = itemsRouter;
