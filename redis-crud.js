const redis = require("redis");

const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASSWORD;
const port = process.env.REDIS_PORT;

const client = redis.createClient({
  host: host,
  password: password,
  port: port
});


async function getAll() {
  const keys = await client.keys("*");
  return await Promise.all(keys.map((key) => readItem(key)));
}

// Create a new item
async function createItem(key, value) {
  await client.set(key, value, redis.print);
}

// Read an existing item
async function readItem(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  });
}

// Update an existing item
async function updateItem(key, value) {
  await client.set(key, value, redis.print);
}

// Delete an existing item
async function deleteItem(key) {
  await client.del(key, redis.print);
}

module.exports = {
  getAll,
  createItem,
  readItem,
  updateItem,
  deleteItem,
};
