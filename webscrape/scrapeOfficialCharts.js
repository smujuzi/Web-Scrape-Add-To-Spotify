const cheerio = require("cheerio");
// External dependencies
const axios = require("axios");
songTitles = [];

// request(
//   "https://www.officialcharts.com/charts/singles-chart/",
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);
//       count = 0;
//       $(".title").each((i, el) => {
//         // const title = $(el).find(".title").text().replace(/\s\s+/g, "");

//         // const artist = $(el).find(".artist-list").text().replace(/ /, "-");
//         count = count + 1;
//         if (count <= 10) {
//           const title = $(el).find("a").text();
//           songTitle.push(title);
//         }
//       });
//       // console.log(songTitle);
//     }
//   }
// );

const getWebsiteContent = async () => {
  try {
    const response = await axios.get(
      "https://www.officialcharts.com/charts/singles-chart/"
    );
    const $ = cheerio.load(response.data);
    count = 0;
    $(".title").each((i, el) => {
      count = count + 1;
      if (count <= 10) {
        const title = $(el).find("a").text();
        songTitles.push(title);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// getWebsiteContent().then(function (res) {
//   console.log(songTitles);
// });

module.exports = {
  getWebsiteContent,
  songTitles,
};
