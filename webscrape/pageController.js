async function scrapeAll(browserInstance, pageScraper) {
  let browser;
  console.log("At top");
  try {
    browser = await browserInstance;
    await pageScraper.scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance, pageScraper) =>
  scrapeAll(browserInstance, pageScraper);
