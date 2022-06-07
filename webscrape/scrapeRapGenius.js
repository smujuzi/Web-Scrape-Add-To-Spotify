const scraper = {
  url: "https://genius.com/",
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector("#application");

    console.log("Rap Genius has loaded");

      const reviewElements = await page.$$(
      ".ChartSongdesktop__CoverAndTitle-sc-18658hh-0.jzapEV"
    );

    for (let i = 0; i < 10; i++) {
      const name = await reviewElements[i].$eval(
        ".ChartSongdesktop__Title-sc-18658hh-3.fODYHn",
        (v) => v.textContent
      );
      console.log({ name });
    }
    console.log("Done");
    page = await browser.close();
  },
};
module.exports = scraper;
