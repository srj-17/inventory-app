const { body, validationResult } = require("express-validator");
const {
  getItemsWithId,
  addNewItem,
  getItemName,
  updateItemName,
  deleteItem,
} = require("../db/queries");

const itemsValidator = [
  body("itemName").trim().notEmpty().withMessage("Item name can't be empty"),
];

async function getItems(req, res) {
  const { categoryId } = req.params;
  const items = await getItemsWithId(categoryId);

  res.render("items", { categoryId: categoryId, title: "Items", items: items });
}

function getCreateItem(req, res) {
  const { categoryId } = req.params;
  res.render("itemsForm", { categoryId: categoryId, title: "Add Item" });
}

const postCreateItem = [
  itemsValidator,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    const { categoryId } = req.params;
    if (!errors.isEmpty()) {
      return res.status(400).render("itemsForm", {
        title: "Add Item",
        categoryId: categoryId,
        errors: errors.array(),
      });
    }

    const { itemName } = req.body;
    await addNewItem(categoryId, itemName);

    res.redirect(`/${categoryId}/items`);
  },
];

async function getUpdateItem(req, res) {
  const { categoryId, itemId } = req.params;
  const itemName = await getItemName(itemId);

  res.render("updateItemForm", {
    title: "Update Title",
    categoryId: categoryId,
    itemId: itemId,
    itemName: itemName,
  });
}

const postUpdateItem = [
  itemsValidator,
  async (req, res) => {
    const errors = validationResult(req);
    const { categoryId } = req.params;
    if (!errors.isEmpty()) {
      return res.status(400).render("updateItemForm", {
        title: "Update Title",
        categoryId: categoryId,
        itemId: itemId,
        itemName: itemName,
        errors: errors.array(),
      });
    }
    const { itemName } = req.body;

    await updateItemName(itemId, itemName);
    res.redirect(`/${categoryId}/items`);
  },
];

async function postDeleteItem(req, res) {
  const { itemId, categoryId } = req.params;
  const { pass } = req.body;

  if (pass === "supersecretpassword") {
    await deleteItem(itemId);
    return res.redirect(`/${categoryId}/items`);
  }

  res.render("deleteItemConfirmation", {
    title: "Confirm deletion",
    itemId: itemId,
    categoryId: categoryId,
    errors: [{ msg: "Incorrect admin password" }],
  });
}

async function getDeleteItem(req, res) {
  const { itemId, categoryId } = req.params;

  res.render("deleteItemConfirmation", {
    title: "Confirm deletion",
    itemId: itemId,
    categoryId: categoryId,
  });
}

module.exports = {
  getItems,
  getCreateItem,
  postCreateItem,
  getUpdateItem,
  postUpdateItem,
  postDeleteItem,
  getDeleteItem,
};
