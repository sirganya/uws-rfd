const { Pool } = require("pg").native;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "oj2die4",
  port: 5432
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
