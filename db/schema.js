const createTableText = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(28) NOT NULL UNIQUE,
  password VARCHAR(40) NOT NULL
);
`;
module.exports = {
  createTableText
};
