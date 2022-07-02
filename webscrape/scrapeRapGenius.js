const cheerio = require("cheerio");
const fs = require("fs");
// External dependencies
const axios = require("axios");
songTitlesRap = [];

const getWebsiteContent = async () => {
  try {
    const response = await axios.get("https://genius.com/", {
      // query URL without using browser cache
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const $ = cheerio.load(response.data);
    count = 0;
    $(".ChartSongdesktop__CoverAndTitle-sc-18658hh-0.jzapEV").each((i, el) => {
      count = count + 1;
      if (count <= 10) {
        const title = $(el)
          .find(".ChartSongdesktop__Title-sc-18658hh-3.fODYHn")
          .text()
          .trim();
        songTitlesRap.push(title);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getWebsiteContent,
  songTitlesRap,
};
