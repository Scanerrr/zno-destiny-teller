const puppeteer = require("puppeteer");
const PageEngine = require("./PageEngine");

class PuppeteerPageEngine extends PageEngine {
  async init() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    await this.page.goto(this.url);
  }

  /**
   * @method select
   * @param {String} querySelector
   * @returns {Promise}
   */
  async select(querySelector) {
    return this.page.$(querySelector);
  }

  async interact(method, querySelector) {
    return this.page[method](querySelector);
  }

  async evaluate(callback) {
    return this.page.evaluate(callback);
  }

  getRawPage() {
    return this.page;
  }
}

module.exports = PuppeteerPageEngine;
