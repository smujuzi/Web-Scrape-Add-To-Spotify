const expect = require("chai").expect;
const assert = require("chai").assert;
const sinon = require("sinon");
const axios = require("axios");
const path = require("path");
const scrapeOfficialCharts = require("../webscrape/scrapeOfficialCharts");
const fs = require("fs");

describe("Test Official Charts Scrape", function () {
  //Good Refresh Token
  let mockAxios;

  describe("Official Charts Valid Songs returned", function () {
    beforeEach(function () {
      mockAxios = sinon.stub(axios, "get");
      mockOfficialChartsSongs = [
        "RUNNING UP THAT HILL",
        "AFRAID TO FEEL",
        "AS IT WAS",
        "BREAK MY SOUL",
        "GREEN GREEN GRASS",
        "GO",
        "ABOUT DAMN TIME",
        "MASSIVE",
        "IFTK",
        "LATE NIGHT TALKING",
      ];

      const html = fs
        .readFileSync(
          path.resolve(__dirname, "./exampleWebsites/sampleOfficialCharts.html")
        )
        .toString("utf-8");

      mockAxios
        .withArgs("https://www.officialcharts.com/charts/singles-chart/", {
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

    it("Successfully returned expected Official Charts songs", async function () {
      let resultOfficialCharts = [];
      await scrapeOfficialCharts.getWebsiteContent().then(async function (res) {
        resultOfficialCharts =
          await scrapeOfficialCharts.songTitlesOfficialCharts;
      });
      expect(resultOfficialCharts).to.eql(mockOfficialChartsSongs);
    });

    afterEach(function () {
      mockAxios.restore();
      mockAxios.resetHistory();
    });
  });
});
