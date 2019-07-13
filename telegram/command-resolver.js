require("./bot-command.td");

class Iterator {
  constructor(items = []) {
    this.id = 0;
    this.items = items;

    this.done = false;
  }

  add(item) {
    this.items.push(item);
  }

  next() {
    const currentItem = this.items[this.id];
    const nextItem = this.items[this.id + 1];

    if (!nextItem) {
      this.done = true;
    }

    this.id += 1;

    return currentItem;
  }

  reset() {
    this.id = 0;
    this.done = false;
  }
}

class CommandResolver {
  constructor() {
    this.resolvers = {};
  }

  resolve(commandType, callback) {
    // add new callback if there's an iterator for the given command type
    if (this.resolvers[commandType] instanceof Iterator)
      this.resolvers[commandType].add(callback);
    // otherwise create a new iterator for the given commandType
    else this.resolvers[commandType] = new Iterator([callback]);
  }

  /**
   * @param {BotCommand} incomingCommand
   */
  run(incomingCommand) {
    const { command, params } = incomingCommand;

    if (!this.resolvers[command]) return;

    const next = (...args) => {
      const callback = this.resolvers[command].next();

      callback(next, ...args);
    };

    while (!this.resolvers[command].done) {
      next(params);
    }

    this.resolvers[command].reset();
  }
}

module.exports = {
  CommandResolver,
  Iterator
};
