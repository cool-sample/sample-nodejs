const util = require("util");
const Redis = require("ioredis");

const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASSWORD;
const port = process.env.REDIS_PORT;

const redisUrl = `redis://:123456@35.232.62.139:9100`;
const redisClient = new Redis(redisUrl);

async function getAll() {
    try {
        const keys = await redisClient.keys("*");

        const values = await Promise.all(keys.map(async (key) => {
            return {
                key,
                value: await redisClient.get(key),
            }
        }));
        return values;
    } catch (error) {
        console.log(error);
    }
}

// Create a new item
async function createItem(key, value) {
  await redisClient.set(key, value);
}

// Read an existing item
async function readItem(key) {
  return redisClient.get(key)
}

// Update an existing item
async function updateItem(key, value) {
  await redisClient.set(key, value);
}

// Delete an existing item
async function deleteItem(key) {
  await redisClient.del(key);
}

module.exports = {
  getAll,
  createItem,
  readItem,
  updateItem,
  deleteItem,
};
