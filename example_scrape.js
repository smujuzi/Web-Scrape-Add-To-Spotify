const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

//Write Headers
writeStream.write(`Title,Link,Date \n`);

request("https://pitchfork.com/", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $(".album-details").each((i, el) => {
      const title = $(el).find(".title").text().replace(/\s\s+/g, "");

      const link = $(el).find("a").attr("href");

      const artist = $(el).find(".artist-list").text().replace(/ /, "-");
      console.log();

      //Write Row To CSV
      writeStream.write(`${title}, ${link}, ${artist} \n`);
      console.log(title, link, artist);
    });

    console.log("Scraping Done...");
  }
});
