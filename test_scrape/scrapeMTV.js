const request = require("request");
const cheerio = require("cheerio");

songTitle = [];
request("http://www.mtv.co.uk/music/charts", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    count = 0;
    $(".promo-type-a.vimn_music_video").each((i, el) => {
      // const title = $(el).find(".title").text().replace(/\s\s+/g, "");

      // const artist = $(el).find(".artist-list").text().replace(/ /, "-");
      count = count + 1;
      if (count <= 10) {
        const title = $(el).find(".promo-title").text();
        songTitle.push(title);
      }
    });
    console.log(songTitle);
  }
});
