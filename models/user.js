const db = require("../db");

class User {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }

  async insert() {
    let sql = "INSERT INTO users (username, password) VALUES ($1, $2)";

    // if user exists let's assume it's updating password operation
    let user = await this.get();

    // console.log(user);

    if (user) {
      sql = "UPDATE users SET password=$2 WHERE username=$1";
    }

    await db.query(sql, [this.username, this.password]);

    user = await this.get(); // get update data

    return user;
  }

  async get() {
    const user = await db.query(
      "SELECT username, password FROM users WHERE username=$1 LIMIT 1",
      [this.username]
    );

    return user.rows && user.rows.length && new User(user.rows[0]);
  }
}

module.exports = User;
