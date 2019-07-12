const axios = require("axios").default;

class Telegram {
  constructor(token) {
    this.token = token;

    this.axios = axios.create({
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async _request(method, { params: requestParams } = { params: {} }) {
    return this.axios.post(
      `${Telegram.requestUrl}${this.token}/${method}`,
      JSON.stringify(requestParams)
    );
  }

  async getMe() {
    return this._request("getMe");
  }

  async getWebhookInfo() {
    return this._request("getWebhookInfo");
  }

  async setWebhook(params) {
    return this._request("setWebhook", { params });
  }
}

// https://api.telegram.org/bot<token>/METHOD_NAME
Telegram.requestUrl = "https://api.telegram.org/bot";

module.exports = Telegram;
