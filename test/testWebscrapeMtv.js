const expect = require("chai").expect;
const assert = require("chai").assert;
const sinon = require("sinon");
const axios = require("axios");
const path = require("path");
const scrapeMTV = require("../webscrape/scrapeMTV");
const fs = require("fs");

describe("Test MTV Scrape", function () {
  //Good Refresh Token
  let mockM;

  describe("MTV Valid Songs returned", function () {
    beforeEach(function () {
      mockM = sinon.stub(axios, "get");
      mockMTVSongs = [];

      const html = fs
        .readFileSync(
          path.resolve(__dirname, "./exampleWebsites/sampleMTV.html")
        )
        .toString("utf-8");

      mockM
        .withArgs("http://www.mtv.co.uk/music/charts", {
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

    it("Successfully returned expected MTV songs", async function () {
      let resultMTV = [];
      await scrapeMTV.getWebsiteContent().then(async function (res) {
        resultMTV = await scrapeMTV.songTitles;
      });
      expect(resultMTV).to.eql(mockMTVSongs);
    });

    afterEach(function () {
      mockM.restore();
      mockM.resetHistory();
    });
  });
});
