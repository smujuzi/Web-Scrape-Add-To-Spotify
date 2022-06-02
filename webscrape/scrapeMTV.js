const scraper = {
  url: "http://www.mtv.co.uk/music/charts",
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector(".page");

    console.log("MTV has loaded");

    //  TESTING
    const reviewElements = await page.$$(".promo-type-a.vimn_music_video");

    for (let i = 0; i < 10; i++) {
      const name = await reviewElements[i].$eval(
        ".promo-title",
        (v) => v.textContent
      );
      console.log({ name });
    }
    console.log("Done");
  },
};
module.exports = scraper;
