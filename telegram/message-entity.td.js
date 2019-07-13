/**
 * @typedef {Object} MessageEntityTypes
 * @readonly
 * @property {String} HASHTAG
 * @property {String} CASHTAG
 * @property {String} BOT_COMMAND
 * @property {String} URL
 * @property {String} EMAIL
 * @property {String} PHONE_NUMBER
 * @property {String} BOLD
 * @property {String} ITALIC
 * @property {String} CODE
 * @property {String} PRE
 * @property {String} TEXT_LINK
 * @property {String} TEXT_MENTION
 */

/**
 * @typedef {Object} MessageEntity
 * @property {Number} offset
 * @property {Number} length
 * @property {MessageEntityTypes} type
 * @property {String} url
 * @property {Object} user
 */
