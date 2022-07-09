const cheerio = require("cheerio");
const axios = require("axios");

const getWebsiteContent = async () => {
  let songTitlesRap = [];
  try {
    const response = await axios.get("https://genius.com/", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const $ = cheerio.load(response.data);
    let count = 0;
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
  return songTitlesRap;
};

module.exports = {
  getWebsiteContent,
};
