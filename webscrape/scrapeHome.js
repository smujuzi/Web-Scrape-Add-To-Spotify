const rapGenius = require("./scrapeRapGenius");
const officialCharts = require("./scrapeOfficialCharts");
const mtv = require("./scrapeMTV");
listOfSongs = [];

async function runWebscrape() {
  await mtv.getWebsiteContent().then(function (res) {
    listOfSongs.push(mtv.songTitles);
  });
  await rapGenius.getWebsiteContent().then(function (res) {
    listOfSongs.push(rapGenius.songTitles);
  });

  await officialCharts.getWebsiteContent().then(function (res) {
    listOfSongs.push(officialCharts.songTitles);
  });
}

// runWebscrape().then(function (res) {
//   console.log("arrived 2");
//   console.log(listOfSongs[0]); //removes blanks
// });

module.exports = {
  runWebscrape,
  listOfSongs,
};
