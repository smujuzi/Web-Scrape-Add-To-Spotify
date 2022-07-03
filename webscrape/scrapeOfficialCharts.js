const cheerio = require("cheerio");
const axios = require("axios");

const getWebsiteContent = async () => {
  let songTitlesOfficialCharts = [];
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
    let count = 0;
    $(".title").each((i, el) => {
      count = count + 1;
      if (count <= 10) {
        const title = $(el).find("a").text().trim();
        songTitlesOfficialCharts.push(title);
      }
    });
  } catch (error) {
    console.error(error);
  }
  return songTitlesOfficialCharts;
};

module.exports = {
  getWebsiteContent,
};
