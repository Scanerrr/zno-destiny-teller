const puppeteer = require("puppeteer");
const { login, isResultsReady, getResultsScreenshot } = require("./utils");

class ZNOPortal {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }
}

ZNOPortal.start = async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const intervalID = setInterval(async function parsePage() {
    await login(ZNOPortal.loginURL, {
      username: this.username,
      password: this.password
    });
    if (await isResultsReady()) {
      await getResultsScreenshot();
      clearInterval(intervalID);
    }

    await page.waitFor(60 * 60 * 1000); // delay for an hour
  }, 0);

  await browser.close();
};

ZNOPortal.loginURL = "https://zno.testportal.com.ua/master/login";

module.exports = ZNOPortal;
