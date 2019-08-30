const redisCluser = require("fast-redis-cluster2").clusterClient;

const opts = {
  //`host` can be ip/hostname of any working instance of cluster
  host: "127.0.0.1",
  port: 6379
  // auth: 'topsecretpassword',
  // force to use fallback node_redis driver as connector
  // useFallbackDriver: true,
};

const r = new redisCluser.clusterInstance(opts, function(err) {
  if (err) throw new Error(err);
  console.log("Connected, cluster is fine and ready for using");
});

r.on("ready", function() {
  console.log("Connected, cluster is fine and ready for using");
});

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
    const res = await r.rawCallAsync(["set", values[0], values[1]]);
    return JSON.stringify(res);
  } catch (error) {
    console.log(error);
  }
};

const read = async () => {
  try {
    const res = await r.rawCallAsync(["get", values[0]]);
    return JSON.stringify(res);
  } catch (error) {
    console.log(error);
  }
};

// CREATE TABLE users (
//    id SERIAL PRIMARY KEY,
//    name VARCHAR NOT NULL,
//    email VARCHAR NOT NULL
// );
