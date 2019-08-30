const Redis = require("ioredis");
const client = new Redis();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on("error", function(err) {
  console.log("Error " + err);
});

client.on("ready", function() {
  console.log("ioredis ready");
});

let id = 0;
const WRITE = "WRITE";
const READ = "READ";

module.exports = payload => {
  id++;
  values = ["brianc" + id, "brian.m.carlson@gmail.com"];
  switch (payload.action) {
    case WRITE:
      return write();
    case READ:
      return read();
    default:
      break;
  }
};

const write = async () => {
  try {
    const res = await setAsync(values[0], values[1]);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const read = async () => {
  try {
    const res = await getAsync(values[0]);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// CREATE TABLE users (
//    id SERIAL PRIMARY KEY,
//    name VARCHAR NOT NULL,
//    email VARCHAR NOT NULL
// );
