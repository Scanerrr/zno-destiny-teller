require("./typedef");

const config = require("../config");

class ZnoPortalInteraction {
  /**
   * @param {PageEngine} pageEngine
   */
  constructor(pageEngine) {
    this.pageEngine = pageEngine;
  }

  async start() {
    await this.pageEngine.init();
  }

  // TODO: throw an exception if login is not successful
  async login(login, password) {
    await this.pageEngine.evaluate(() => {
      document.querySelector("#CertNum").value = login;
      document.querySelector("#CertPIN").value = password;
    });

    await this.pageEngine.interact("click", ".accent_back"); // submit login
  }

  // async getResults() {
  // TODO: implement the method
  // }
}

ZnoPortalInteraction.url = config.zno_portal_url;

module.exports = ZnoPortalInteraction;
