const express = require("express");
const Telegram = require("./telegram");

const config = require("./config");

const bot = new Telegram(config.telegram.api_key);
const app = express();

// Add body-parser middleware
app.use(require("body-parser").json());
// Add morgan logger middleware
app.use(require("morgan")("combined"));

// Bot endpoints
app.post("/initialize_bot", async (req, res) => {
  // check if webhook exists already
  const { data } = await bot.getWebhookInfo();

  // let's assume that no url means hook doesn't exist
  if (data && data.result && !data.result.url) {
    try {
      // set up the new hook
      await bot.setWebhook({
        url: config.telegram.webhook_url
      });
    } catch (error) {
      console.error(error);
    }
  }

  res.send();
});

app.post("/bot", async (req, res) => {
  const { message } = req.body;

  // bot received a message
  if (message) {
    if (message.entities && message.entities.type === "bot_command") {
      // bot command received
    }
  }
  res.send();
});

app.listen(config.port, () => {
  console.log(`application started on port ${config.port}`);
});
