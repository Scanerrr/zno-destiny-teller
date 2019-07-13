//TODO: fix page errors
async function login({ username, password }) {
  await page.goto(LOGIN_URL);

  // fill login form
  await page.evaluate(() => {
    document.querySelector("#CertNum").value = username;
    document.querySelector("#CertPIN").value = password;
  });

  // submit login
  await page.click(".accent_back");

  // TODO: check if was logged in
}

async function isResultsReady() {
  const hasResults = await page.$eval(
    "#tab3",
    tab => !tab.hasAttribute("disabled")
  );
  return hasResults;
}

async function getResultsScreenshot() {
  await page.click("#tab3");

  // TODO: make a screenshot and make telegram bot send it
  // const resultsScreenshot = await page.screenshot({ encoding: "base64" });
}

module.exports = {
  login,
  isResultsReady,
  getResultsScreenshot
};
