const expect = require("chai").expect;
const sinon = require("sinon");
const axios = require("axios");
const path = require("path");
const scrapeRapGenius = require("../webscrape/scrapeRapGenius");
const fs = require("fs");

describe.only("Test Rap Genius Scrape", function () {
  //Good Refresh Token
  let mock;
  describe("Valid Songs returned", function () {
    beforeEach(function () {
      mock = sinon.stub(axios, "get");
      mockSongs = [
        "Rich Minion",
        "Running Up That Hill (A Deal with God)",
        "Glimpse of Us",
        "Left and Right",
        "Jimmy Cooks",
        "From The D 2 The LBC",
        "Bad Habit",
        "BREAK MY SOUL",
        "Crazy Rap (Colt 45 & 2 Zig-Zags)",
        "Carolina",
      ];

      const html = fs
        .readFileSync(
          path.resolve(__dirname, "./exampleWebsites/sampleRapGenius.html")
        )
        .toString("utf-8");

      mock
        .withArgs("https://genius.com/", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .returns(
          Promise.resolve({
            data: html,
          })
        );
    });

    it("Successfully returned expected Rap Genius songs", async function () {
      result = [];
      await scrapeRapGenius.getWebsiteContent().then(function (res) {
        result = scrapeRapGenius.songTitles;
      });
      expect(result).to.eql(mockSongs);
    });

    afterEach(function () {
      mock.restore();
      mock.resetHistory();
    });
  });
});
