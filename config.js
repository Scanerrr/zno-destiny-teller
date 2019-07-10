const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  botApiKey: process.env.TELEGRAM_BOT_API,
  chatID: process.env.TELEGRAM_CHAT_ID,
  login: process.env.ZNO_LOGIN,
  password: process.env.ZNO_PASSWORD,
  port: process.env.PORT || 8080
};
