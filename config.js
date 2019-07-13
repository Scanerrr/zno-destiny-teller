const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  telegram: {
    api_key: process.env.TELEGRAM_BOT_API,
    webhook_url: process.env.TELEGRAM_WEBHOOK_URL
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    uri: process.env.DB_URI
  },
  zno_portal_url: process.env.ZNO_PORTAL_URL,
  chatID: process.env.TELEGRAM_CHAT_ID,
  login: process.env.ZNO_LOGIN,
  password: process.env.ZNO_PASSWORD,
  port: process.env.PORT || 8080
};
