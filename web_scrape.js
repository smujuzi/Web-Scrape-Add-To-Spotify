const request = require("request");
const cheerio = require("cheerio");

request("https://pitchfork.com/", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    // const artistList = $(".artist-list");

    // console.log(artistList.html());
    // console.log(artistList.text());

    // const output = artistList.find("li").text();
    // const output = artistList.children("li").next().text();
    // const output = artistList.children("li").parent().text();

    $(".album-details a").each((i, el) => {
      const item = $(el).text();
      const link = $(el).attr("href");

      console.log(item);
      console.log(link);
    });
  }
});
