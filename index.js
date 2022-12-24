const express = require("express");

const {
  createItem,
  readItem,
  updateItem,
  deleteItem,
  getAll,
} = require("./redis-crud");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World - This is Dev!");
});

app.get("/secrets", (req, res) => {
  return res.json({
    secrets: process.env,
  });
});

app.get("/items", async (req, res) => {
  try {
    const values = await getAll();
    res.send(values);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
});

app.get("/item", async (req, res) => {
  const { key, value } = req.query;
  try {
    await createItem(key, value);
    res.sendStatus(200);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
});

app.get("/item/:key", async (req, res) => {
  const key = req.params.key;
  try {
    const value = await readItem(key);
    res.send(value);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
});

app.get("/item/:key/update", async (req, res) => {
  const key = req.params.key;
  const { value } = req.query;
  try {
    await updateItem(key, value);
    res.sendStatus(200);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
});

app.get("/item/:key/delete", async (req, res) => {
  const key = req.params.key;
  try {
    await deleteItem(key);
    res.sendStatus(200);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
