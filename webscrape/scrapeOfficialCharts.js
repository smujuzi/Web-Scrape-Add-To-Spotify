const scraper = {
  url: "https://www.officialcharts.com/charts/singles-chart/",
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector("#container");
    console.log("Official Charts has loaded");

    const reviewElements = await page.$$(".title");
    for (let i = 0; i < 10; i++) {
      const name = await reviewElements[i].$eval("a", (v) => v.textContent);
      console.log({ name });
    }
    console.log("Done");
    page = await browser.close();
  },
};
module.exports = scraper;
