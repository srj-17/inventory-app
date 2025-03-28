const {
  getItemsWithId,
  addNewItem,
  getItemName,
  updateItemName,
  deleteItem,
} = require("../db/queries");

async function getItems(req, res) {
  const { categoryId } = req.params;
  const items = await getItemsWithId(categoryId);

  res.render("items", { categoryId: categoryId, title: "Items", items: items });
}

function getCreateItem(req, res) {
  const { categoryId } = req.params;
  res.render("itemsForm", { categoryId: categoryId, title: "Create Item" });
}

async function postCreateItem(req, res) {
  const { categoryId } = req.params;
  const { itemName } = req.body;
  await addNewItem(categoryId, itemName);

  res.redirect(`/${categoryId}/items`);
}

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

async function postUpdateItem(req, res) {
  const { categoryId, itemId } = req.params;
  const { itemName } = req.body;

  await updateItemName(itemId, itemName);
  res.redirect(`/${categoryId}/items`);
}

async function postDeleteItem(req, res) {
  const { itemId, categoryId } = req.params;
  await deleteItem(itemId);

  return res.redirect(`/${categoryId}/items`);
}

module.exports = {
  getItems,
  getCreateItem,
  postCreateItem,
  getUpdateItem,
  postUpdateItem,
  postDeleteItem,
};
