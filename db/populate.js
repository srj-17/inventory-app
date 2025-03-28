#!/usr/bin/env node

const { argv } = require("node:process");
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name) 
VALUES 
    ('Defense'), 
    ('Offense'), 
    ('Clothes');

INSERT INTO items (name, category_id)
VALUES 
    ('Shield', 1), 
    ('Sword', 2), 
    ('Vest', 3);
`;

async function main() {
  console.log("Sending...");
  if (!argv[2]) {
    console.log("Usage: num run populate [url_to_db]");
    return;
  }

  const url = new URL(argv[2]);
  const client = new Client({
    connectionString: url.toString(),
  });
  await client.connect();

  try {
    await client.query(SQL);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
    console.log("Done");
  }
}

main();
