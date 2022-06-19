const cheerio = require("cheerio");
// External dependencies
const axios = require("axios");
songTitles = [];

songTitles = [];

const getWebsiteContent = async () => {
  try {
    const response = await axios.get("https://genius.com/");
    const $ = cheerio.load(response.data);
    count = 0;
    $(".ChartSongdesktop__CoverAndTitle-sc-18658hh-0.jzapEV").each((i, el) => {
      count = count + 1;
      if (count <= 10) {
        const title = $(el)
          .find(".ChartSongdesktop__Title-sc-18658hh-3.fODYHn")
          .text();
        songTitles.push(title);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// request("https://genius.com/", (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);
//     count = 0;
//     $(".ChartSongdesktop__CoverAndTitle-sc-18658hh-0.jzapEV").each((i, el) => {
//       // const title = $(el).find(".title").text().replace(/\s\s+/g, "");

//       // const artist = $(el).find(".artist-list").text().replace(/ /, "-");
//       count = count + 1;
//       if (count <= 10) {
//         const title = $(el)
//           .find(".ChartSongdesktop__Title-sc-18658hh-3.fODYHn")
//           .text();
//         songTitle.push(title);
//       }
//     });
//     // console.log(songTitle);
//   }
// });

// getWebsiteContent().then(function (res) {
//   console.log("rapgenius");
//   console.log(songTitles);
// });

module.exports = {
  getWebsiteContent,
  songTitles,
};
