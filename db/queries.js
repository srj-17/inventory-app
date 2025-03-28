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

module.exports = {
  getAllCategories,
  getItemsWithId,
  addNewCategory,
  addNewItem,
};
