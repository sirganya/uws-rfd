var Redis = require("redis-fast-driver");

var r = new Redis({
  //host: '/tmp/redis.sock', //unix domain
  host: "127.0.0.1", //can be IP or hostname
  port: 6379,
  autoConnect: true, //will connect after creation
  doNotSetClientName: false, //will set connection name (you can see connections by running CLIENT LIST on redis server)
  doNotRunQuitOnEnd: false //when you call `end()`, driver tries to send `QUIT` command to redis before actual end
});

//happen only once
r.on("ready", function() {
  console.log("fast driver redis ready");
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
    const res = await r.rawCallAsync(["set", values[0], values[1]]);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const read = async () => {
  try {
    const res = await r.rawCallAsync(["get", values[0]]);
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
