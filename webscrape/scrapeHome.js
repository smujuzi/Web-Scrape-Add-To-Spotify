const rapGenius = require("./scrapeRapGenius");
const officialCharts = require("./scrapeOfficialCharts");
const mtv = require("./scrapeMTV");
listOfSongs = [];

async function runWebscrape() {
  await mtv.getWebsiteContent().then(function (res) {
    listOfSongs.push(mtv.songTitles);
  });
  await rapGenius.getWebsiteContent().then(function (res) {
    listOfSongs.push(rapGenius.songTitlesRap);
  });

  await officialCharts.getWebsiteContent().then(function (res) {
    listOfSongs.push(officialCharts.songTitlesOfficialCharts);
  });
}

module.exports = {
  runWebscrape,
  listOfSongs,
};
