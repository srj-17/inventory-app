require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();

// parse the incoming inputs
app.use(express.urlencoded({ extended: true }));

// set the views engine
app.set("view engine", "ejs");

const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");

app.use("/", categoriesRouter);
app.use("/:categoryId/items", itemsRouter);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.status(404).send("404 not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
