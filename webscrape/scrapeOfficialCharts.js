const cheerio = require("cheerio");
const fs = require("fs");

// External dependencies
const axios = require("axios");

songTitlesOfficialCharts = [];

const getWebsiteContent = async () => {
  try {
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

    const $ = cheerio.load(response.data);
    count = 0;
    $(".title").each((i, el) => {
      count = count + 1;
      if (count <= 10) {
        const title = $(el).find("a").text().trim();
        // console.log("title:");
        // console.log(title);
        songTitlesOfficialCharts.push(title);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getWebsiteContent,
  songTitlesOfficialCharts,
};
