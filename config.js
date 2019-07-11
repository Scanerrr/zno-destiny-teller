const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  telegram: {
    api_key: process.env.TELEGRAM_BOT_API,
    webhook_url: process.env.TELEGRAM_WEBHOOK_URL
  },
  chatID: process.env.TELEGRAM_CHAT_ID,
  login: process.env.ZNO_LOGIN,
  password: process.env.ZNO_PASSWORD,
  port: process.env.PORT || 8080
};
