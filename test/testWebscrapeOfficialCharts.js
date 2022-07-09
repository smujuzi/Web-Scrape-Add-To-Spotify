const expect = require("chai").expect;
const sinon = require("sinon");
const axios = require("axios");
const path = require("path");
const scrapeOfficialCharts = require("../webscrape/scrapeOfficialCharts");
const fs = require("fs");
const htmlOfficial = fs
  .readFileSync(
    path.resolve(__dirname, "./exampleWebsites/sampleOfficialCharts.html")
  )
  .toString("utf-8");
const sampleSongs = require("./exampleData/sampleSongs");

describe("Test Official Charts Scrape", function () {
  let mockAxios;

  describe("Official Charts Valid Songs returned", function () {
    beforeEach(function () {
      mockAxios = sinon.stub(axios, "get");
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
            data: htmlOfficial,
          })
        );
    });

    it("Successfully returned expected Official Charts songs", async function () {
      const resultOfficialCharts =
        await scrapeOfficialCharts.getWebsiteContent();

      const mockOfficialChartsSongs = sampleSongs.getMockOfficialChartsSongs();
      expect(resultOfficialCharts).to.eql(mockOfficialChartsSongs);
    });

    afterEach(function () {
      mockAxios.restore();
      mockAxios.resetHistory();
    });
  });
});
