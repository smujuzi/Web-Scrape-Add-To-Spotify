const assert = require("chai").assert;
const sinon = require("sinon");
const songMatching = require("../src/song_matching");
const scraping = require("../webscrape/scrapeHome");
const spotifyFeatures = require("../spotify/features");
const sampleSongs = require("./exampleData/sampleSongs");

describe("Test Song Matching", async function () {
  describe("Get Top Tracks", async function () {
    let mockScraping;
    let mockSpotifyFeatures;

    beforeEach(function () {
      mockScraping = sinon.stub(scraping, "runWebscrape");
      mockSpotifyFeatures = sinon.stub(
        spotifyFeatures,
        "getTodaysTopHitsPlaylist"
      );
      const mockListOfScrapedSongs = sampleSongs.getMockListOfScrapedSongs();
      const mockTopHitsSpotify = sampleSongs.getMockTopHitsSpotify();

      mockScraping.withArgs().returns(Promise.resolve(mockListOfScrapedSongs));
      mockSpotifyFeatures
        .withArgs({})
        .returns(Promise.resolve(mockTopHitsSpotify));
    });

    it("Returned correct top Tracks", async function () {
      const actualTopTracks = await songMatching.getTopTracks({});
      const mockTopTracks = ["AS IT WAS", "BREAK MY SOUL", "ABOUT DAMN TIME"];
      assert.deepEqual(actualTopTracks, mockTopTracks);
    });

    afterEach(function () {
      mockScraping.resetHistory();
      mockScraping.restore();

      mockSpotifyFeatures.resetHistory();
      mockSpotifyFeatures.restore();
    });
  });
});
