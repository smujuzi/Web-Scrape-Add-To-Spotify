const cheerio = require("cheerio");
const fs = require("fs");
// External dependencies
const axios = require("axios");

songTitles = [];

const getWebsiteContent = async () => {
  try {
    const response = await axios.get("http://www.mtv.co.uk/music/charts", {
      // query URL without using browser cache
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    fs.writeFile(
      "test/exampleWebsites/sampleMTV.html",
      response.data,
      (err) => {
        if (err) throw err;
      }
    );

    const $ = cheerio.load(response.data);
    count = 0;
    $(".promo-type-a.vimn_music_video").each((i, el) => {
      count = count + 1;
      if (count <= 10) {
        const title = $(el).find(".promo-title").text().trim();
        songTitles.push(title);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getWebsiteContent,
  songTitles,
};
