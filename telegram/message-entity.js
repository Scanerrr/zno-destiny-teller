/**
 * @class
 * @type {MessageEntity}
 */
class MessageEntity {
  constructor({ offset, length, type, url, user }) {
    this.offset = offset;
    this.length = length;
    this.type = type;
    this.url = url;
    this.user = user;
  }

  getText(wholeMessage) {
    return wholeMessage.slice(this.offset + 1, this.length);
  }

  is(type) {
    return this.type === type;
  }
}

/** @type {MessageEntityTypes} */
MessageEntity.types = {
  HASHTAG: "hashtag",
  CASHTAG: "cashtag",
  BOT_COMMAND: "bot_command",
  URL: "url",
  EMAIL: "email",
  PHONE_NUMBER: "phone_number",
  BOLD: "bold",
  ITALIC: "italic",
  CODE: "code",
  PRE: "pre",
  TEXT_LINK: "text_link",
  TEXT_MENTION: "text_mention"
};

module.exports = MessageEntity;
