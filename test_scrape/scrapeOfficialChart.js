const request = require("request");
const cheerio = require("cheerio");

songTitle = [];
request(
  "https://www.officialcharts.com/charts/singles-chart/",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      count = 0;
      $(".title").each((i, el) => {
        // const title = $(el).find(".title").text().replace(/\s\s+/g, "");

        // const artist = $(el).find(".artist-list").text().replace(/ /, "-");
        count = count + 1;
        if (count <= 10) {
          const title = $(el).find("a").text();
          songTitle.push(title);
        }
      });
      console.log(songTitle);
    }
  }
);
