const express = require("express");
const { Telegram, MessageEntity, BotCommand } = require("./telegram");

const {
  isValidMessage,
  hasEntities
} = require("./telegram/helpers").validators;

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

  // let's assume that no url means hook doesn't exist
  try {
    // set up the new hook
    await bot.setWebhook({
      url: config.telegram.webhook_url
    });
  } catch (error) {
    console.error(error);
  }

  res.send();
});

app.post("/bot", async (req, res) => {
  const { message } = req.body;

  if (!isValidMessage(message) && !hasEntities(message)) return res.send();

  // get the fisrt incoming entity
  const entity = new MessageEntity(message.entities[0]);

  // if entity type is not bot_command - return
  if (!entity.is(MessageEntity.types.BOT_COMMAND)) return res.send();

  const command = new BotCommand(entity, message.text);

  console.log(command);
  return res.send();
});

app.listen(config.port, () => {
  console.log(`application started on port ${config.port}`);
});
