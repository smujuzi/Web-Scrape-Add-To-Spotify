const browserObject = require("./browser");
const scraperController = require("./pageController");
const rapGenius = require("./scrapeRapGenius");
const officialCharts = require("./scrapeOfficialCharts");
const mtv = require("./scrapeMTV");
websites = [rapGenius, officialCharts, mtv];
listOfSongs = [];

async function runWebscrape() {
  for (const [index, pageScraper] of websites.entries()) {
    //Start the broswer and create a browser instance
    let browserInstance = browserObject.startBrowser();

    // Pass the broswer instance to the scraper controller
    await scraperController(browserInstance, pageScraper);
    listOfSongs.push({
      website: pageScraper.name,
      url: pageScraper.url,
      currentHits: pageScraper.songTitle,
    });
  }
  console.log(listOfSongs);
}
runWebscrape();

module.exports = {
  runWebscrape,
};
