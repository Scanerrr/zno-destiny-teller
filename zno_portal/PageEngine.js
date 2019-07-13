/* eslint-disable class-methods-use-this */
class PageEngine {
  constructor(url) {
    this.url = url;
  }

  init() {
    throw new ReferenceError("Method not implemented.");
  }

  navigate() {
    throw new ReferenceError("Method not implemented.");
  }

  select() {
    throw new ReferenceError("Method not implemented.");
  }

  evaluate() {
    throw new ReferenceError("Method not implemented.");
  }

  interact() {
    throw new ReferenceError("Method not implemented.");
  }
}

module.exports = PageEngine;
