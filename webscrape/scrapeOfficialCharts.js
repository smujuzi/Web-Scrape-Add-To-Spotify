const cheerio = require("cheerio");
const fs = require("fs");

// External dependencies
const axios = require("axios");

songTitles = [];

const getWebsiteContent = async () => {
  try {
    console.log("started");
    const response = await axios.get(
      "https://www.officialcharts.com/charts/singles-chart/",
      {
        // query URL without using browser cache
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    // console.log("coming soon:");
    // console.log(response.data);
    // console.log("all above me");

    // fs.writeFile(
    //   "test/exampleWebsites/sampleOfficialCharts.html",
    //   response.data,
    //   (err) => {
    //     if (err) throw err;
    //   }
    // );

    const $ = cheerio.load(response.data);
    count = 0;
    $(".title").each((i, el) => {
      count = count + 1;
      if (count <= 10) {
        const title = $(el).find("a").text().trim();
        // console.log("title:");
        // console.log(title);
        songTitles.push(title);
      }
    });
  } catch (error) {
    console.error(error);
  }
  console.log("hereee");
  console.log(songTitles);
};

module.exports = {
  getWebsiteContent,
  songTitles,
};
