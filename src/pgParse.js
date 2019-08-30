const db = require("./db");
let id = 0;
const WRITE = "WRITE";
const READ = "READ";
let values;

const textWrite = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";

module.exports = payload => {
  payload = JSON.parse(payload);
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
    const res = await db.query(textWrite, values);
    return JSON.stringify(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
};

const read = async () => {
  try {
    const textRead = `SELECT * FROM users WHERE name = '${values[0]}'`;
    const res = await db.query(textRead);
    return JSON.stringify(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
};

// CREATE TABLE users (
//    id SERIAL PRIMARY KEY,
//    name VARCHAR NOT NULL,
//    email VARCHAR NOT NULL
// );
