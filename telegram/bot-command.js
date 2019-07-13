class BotCommand {
  constructor(messageEntity, messageText) {
    this.command = messageText.slice(
      messageEntity.offset + 1,
      messageEntity.length
    );

    this.params = messageText.slice(messageEntity.length + 1).split(" ");
  }
}

module.exports = BotCommand;
