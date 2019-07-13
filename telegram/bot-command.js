require("./message-entity.td");

class Command {
  constructor(command, params) {
    this.command = command;
    this.params = params;
  }
}

class BotCommand extends Command {
  /**
   *
   * @param {MessageEntity} messageEntity
   * @param {String} messageText
   */
  constructor(messageEntity, messageText) {
    const command = messageText.slice(
      messageEntity.offset + 1,
      messageEntity.length
    );

    const params = messageText.slice(messageEntity.length + 1).split(" ");

    super(command, params);
  }
}

BotCommand.types = {
  REGISTER: "register",
  RESULTS: "results"
};

module.exports = { BotCommand, Command };
