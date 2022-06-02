// const pageScraper = require("./scrapeRapGenius");
// const pageScraper = require("./scrapeOfficialCharts");
const pageScraper = require("./scrapeMTV");
// const pageScraper = require("./pageScraperMultiple");
async function scrapeAll(browserInstance) {
  let browser;
  console.log("At top");
  try {
    browser = await browserInstance;
    await pageScraper.scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
