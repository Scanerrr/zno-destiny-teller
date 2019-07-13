module.exports = {
  validators: {
    isValidMessage: function isValidMessage(message) {
      return message && message.text && message.entities;
    },
    hasEntities: function hasEntities(message) {
      return message.entities.length;
    }
  }
};
