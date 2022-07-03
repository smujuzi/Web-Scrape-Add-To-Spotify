const expect = require("chai").expect;
const sinon = require("sinon");
const axios = require("axios");
const path = require("path");
const scrapeRapGenius = require("../webscrape/scrapeRapGenius");
const fs = require("fs");
const htmlRapGenius = fs
  .readFileSync(
    path.resolve(__dirname, "./exampleWebsites/sampleRapGenius.html")
  )
  .toString("utf-8");

describe("Test Rap Genius Scrape", function () {
  let mockR;
  describe("Rap Genius Valid Songs returned", function () {
    beforeEach(function () {
      mockR = sinon.stub(axios, "get");

      mockR
        .withArgs("https://genius.com/", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .returns(
          Promise.resolve({
            data: htmlRapGenius,
          })
        );
    });

    it("Successfully returned expected Rap Genius songs", async function () {
      resultRapGenius = await scrapeRapGenius.getWebsiteContent();

      mockRapGeniusSongs = [
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
      expect(resultRapGenius).to.eql(mockRapGeniusSongs);
    });

    afterEach(function () {
      mockR.restore();
      mockR.resetHistory();
    });
  });
});
