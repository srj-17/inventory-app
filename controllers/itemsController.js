const { getItemsWithId, addNewItem } = require("../db/queries");

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

module.exports = {
  getItems,
  getCreateItem,
  postCreateItem,
};
