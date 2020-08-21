require('dotenv').config()
const {Builder, By, Key, until, Actions} = require('selenium-webdriver')
const utils = require('./utils')

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
const ONDEMAND_URL = `https://${SAUCE_USERNAME.toString()}:${SAUCE_ACCESS_KEY.toString()}@ondemand.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
// const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;


/**
* Run this test before working on the problem.
* When you view the results on your dashboard, you'll see that the test "Failed".
* Your job is to figure out why the test failed and make the changes necessary to make the test pass.
*
* Bonus: Once you get the test working, update the code so that when the test runs, it 
* can reach the Sauce Labs homepage 
* and then open the Docs page
*/

describe('Broken Sauce', function () {
    it('should go to Google and click Sauce', async function () {
        let driver = await new Builder().withCapabilities(utils.brokenCapabilities)
                    .usingServer(ONDEMAND_URL).build();

        await driver.get("https://www.google.com");
        try{
            let search = await driver.findElement(By.name("q"));
            await search.sendKeys("Sauce Labs");
        
            let button = await driver.findElement(By.name("btnK"))
            await button.click()

            let page = await driver.findElement(By.partialLinkText("sauce"));
            await page.click()
        
            let resources = await driver.findElement({css: '.nav-menu-list > .nav-menu-list-item:nth-of-type(4) > div > div > a'})
            const actions = await driver.actions({async: true})
            actions.move({origin: resources})
//Bonus section:
            let popup = await driver.findElement({css: '.link.has-chevron:nth-of-type(1)'})
            await popup.isDisplayed()
            if (popup.isDisplayed) {
                popup.click()
            }
        }
        finally {
            driver.executeScript("sauce:job-result=" + (true ? "passed" : "failed"));
            await driver.quit();
        }
    });
});
