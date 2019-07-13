const { Pool } = require("pg");
const { createTableText } = require("./schema");
const config = require("../config");

const pool = new Pool({
  connectionString: config.db.uri,
  ssl: true
});

const query = (text, params) => pool.query(text, params);

// create our users table if not exists
(async () => {
  await query(createTableText);
})();

module.exports = {
  query
};
