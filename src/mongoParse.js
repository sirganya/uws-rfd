const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

let db;
let id = 0;
const WRITE = "WRITE";
const READ = "READ";

(async function() {
  // Connection URL
  const url = "mongodb://localhost:27017/newting";
  // Database Name
  const dbName = "newting";
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();

    db = client.db(dbName);
  } catch (err) {
    console.log(err.stack);
  }
})();

module.exports = payload => {
  payload = JSON.parse(payload);
  id++;
  values = ["brianc" + id, "brian.m.carlson@gmail.com"];
  console.log();
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
    const res = await db
      .collection("inserts")
      .insertOne({ name: values[0], email: values[1] });
    // assert.equal(1, res.insertedCount);
    return JSON.stringify(res);
  } catch (error) {
    // assert.equal(null, error);
    console.log(error);
  }
};

const read = async () => {
  try {
    const res = await db.collection("inserts").findOne({ name: values[0] });
    // assert.equal(1, res.length);
    console.log(res);
    return JSON.stringify(res);
  } catch (error) {
    // assert.equal(null, error);
    console.log(error);
  }
};
