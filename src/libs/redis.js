const redis = require("redis");
require("dotenv").config();
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});
client
  .connect()
  .then(() => console.log("Connected to Redis successfully!"))
  .catch((err) => console.error("Failed to connect to Redis:", err));
// const client = redis.createClient({
//   url: process.env.REDIS_URL,
// });
// client
//   .connect()
//   .then(() => console.log("Connected to Redis successfully!"))
//   .catch((err) => console.error("Failed to connect to Redis:", err.message));

// client.on("end", () => console.log("Client disconnected from Redis"));

module.exports = client;
