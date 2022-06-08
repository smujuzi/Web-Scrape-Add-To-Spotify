const scraper = {
  name: "mtv",
  url: "http://www.mtv.co.uk/music/charts",
  songTitle: [],
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector(".page");

    console.log("MTV has loaded");

    const reviewElements = await page.$$(".promo-type-a.vimn_music_video");

    for (let i = 0; i < 10; i++) {
      const name = await reviewElements[i].$eval(
        ".promo-title",
        (v) => v.textContent
      );
      this.songTitle.push(name);
    }
    page = await browser.close();
  },
};
module.exports = scraper;
