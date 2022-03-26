const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

//Write Headers
writeStream.write(`Title,Link,Date \n`);

request("https://genius.com/#top-songs", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    console.log("We here");
    $(".PageGridFull-idpot7-0").each((i, el) => {
      const songTitle = $(el)
        .find("ChartSongdesktop__Title-sc-18658hh-3 fODYHn")
        .text();

      // const title = $(el).find(".title").text().replace(/\s\s+/g, "");

      // const link = $(el).find("a").attr("href");

      // const artist = $(el).find(".artist-list").text().replace(/ /, "-");
      console.log();

      //Write Row To CSV
      // writeStream.write(`${title}, ${link}, ${artist} \n`);
      console.log("Look here")
      console.log(songTitle);
      console.log("Bottom");
    });

    console.log("Scraping Done...");
  }
});
