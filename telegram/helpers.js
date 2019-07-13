module.exports = {
  validators: {
    isValidMessage: function isValidMessage(message) {
      return message && message.text;
    },
    hasEntities: function hasEntities(message) {
      return message.entities && message.entities.length;
    }
  }
};
