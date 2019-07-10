const { botApiKey, chatID, login, password } = require('./config');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

const sendMessage = (message = 'No text') => {
    const URL = `https://api.telegram.org/bot${botApiKey}/sendMessage?chat_id=${chatID}&text=${message}`;
    
    return fetch(URL).then(res => {
        res.ok && console.log('User notified!')
        !res.ok && console.error('Error text: ', res.statusText)
    }).catch(err => console.error('Send Message Error', err));
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let i = 0; // just for tracking attempts
    while(true){

        await page.goto('https://zno.testportal.com.ua/master/login');

        // fill login form
        await page.evaluate(() => {
            document.querySelector('#CertNum').value = login;
            document.querySelector('#CertPIN').value = password;
        });

        await page.click('.accent_back'); // submit login

        const hasResults = await page.$eval('#tab3', tab => !tab.hasAttribute('disabled'));

        if (hasResults) {
            console.log('-----Results Tab ENABLED-----');
            sendMessage(`Hey, go check your ZNO results, I believe they're ready!\n
                zno.testportal.com.ua`)
            break;
        }

        i++;
        console.log('Attemp #' + i, 'Results Tab Disabled');

        await page.waitFor(60 * 60 * 1000) // delay for an hour

    }


    await browser.close();
})();