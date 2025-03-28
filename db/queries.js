const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getItemsWithId(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id=$1",
    [categoryId],
  );
  return rows;
}

async function addNewCategory(categoryName) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [categoryName]);
}

async function addNewItem(categoryId, itemName) {
  await pool.query("INSERT INTO items (name, category_id) VALUES ($1, $2)", [
    itemName,
    categoryId,
  ]);
}

async function getCategoryName(categoryId) {
  const { rows } = await pool.query("SELECT name FROM categories WHERE id=$1", [
    categoryId,
  ]);

  return rows[0].name;
}

async function updateCategoryName(id, newName) {
  await pool.query("UPDATE categories SET name=$1 WHERE id=$2", [newName, id]);
}

async function getItemName(itemId) {
  const { rows } = await pool.query("SELECT name FROM items WHERE id=$1", [
    itemId,
  ]);

  return rows[0].name;
}

async function updateItemName(itemId, name) {
  await pool.query("UPDATE items SET name=$1 WHERE id=$2", [name, itemId]);
}

module.exports = {
  getAllCategories,
  getItemsWithId,
  addNewCategory,
  addNewItem,
  getCategoryName,
  updateCategoryName,
  getItemName,
  updateItemName,
};
