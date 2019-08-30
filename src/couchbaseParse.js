const { promisify } = require("util");
var couchbase = require("couchbase");
var cluster = new couchbase.Cluster("couchbase://127.0.0.1", {
  username: "greg",
  password: "oj2die4"
});
var bucket = cluster.bucket("ting");
var collection = bucket.defaultCollection();

const collectionUpsert = promisify(collection.upsert).bind(collection);
const collectionGet = promisify(collection.get).bind(collection);

let db;
let id = 0;
const WRITE = "WRITE";
const READ = "READ";

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
    const doc = { email: values[1] };
    const res = await collectionUpsert(values[0], doc);
    return JSON.stringify(res);
  } catch (error) {
    console.log(error);
  }
};

const read = async () => {
  try {
    const res = await collectionGet(values[0]);
    return JSON.stringify(res);
  } catch (error) {
    console.log(error);
  }
};
