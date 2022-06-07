const scraper = {
  name: "official-charts",
  url: "https://www.officialcharts.com/charts/singles-chart/",
  songTitle: [],
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector("#container");
    console.log("Official Charts has loaded");

    const reviewElements = await page.$$(".title");
    for (let i = 0; i < 10; i++) {
      const name = await reviewElements[i].$eval("a", (v) => v.textContent);
      this.songTitle.push(name);
    }
    page = await browser.close();
  },
};
module.exports = scraper;
