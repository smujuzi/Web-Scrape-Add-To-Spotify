const rapGenius = require("./scrapeRapGenius");
const officialCharts = require("./scrapeOfficialCharts");
const mtv = require("./scrapeMTV");

async function runWebscrape() {
  const listOfSongs = [];
  //axios calls in parallel promise.all[] //think about how to handle failure
  await mtv.getWebsiteContent().then(function (res) {
    listOfSongs.push(mtv.songTitles);
  });

  const rapSongs = await rapGenius.getWebsiteContent();
  listOfSongs.push(rapSongs);

  const offSongs = await officialCharts.getWebsiteContent();
  listOfSongs.push(offSongs);

  return listOfSongs;
}

module.exports = {
  runWebscrape,
};
