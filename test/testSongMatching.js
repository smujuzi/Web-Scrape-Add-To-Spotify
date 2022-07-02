const assert = require("chai").assert;
const sinon = require("sinon");
const songMatching = require("../src/song_matching");
const scraping = require("../webscrape/scrapeHome");
const spotifyFeatures = require("../spotify/features");

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
      mockListOfScrapedSongs = [
        [],
        [
          "Hot Shit",
          "Running Up That Hill (A Deal with God)",
          "Rich Minion",
          "Vicious",
          "MORE",
          "​vodila",
          "First Day Out",
          "​touch tank",
          "РКН (RKN)",
          "Elon Musk",
        ],
        [
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
        ],
      ];
      mockTopHitsSpotify = [
        "As It Was",
        "Left and Right (Feat. Jung Kook of BTS)",
        "About Damn Time",
        "Glimpse of Us",
        "I Like You (A Happier Song) (with Doja Cat)",
        "Running Up That Hill (A Deal With God) - 2018 Remaster",
        "BREAK MY SOUL",
        "Me Porto Bonito",
        "First Class",
        "Hot Shit (feat. Ye & Lil Durk)",
      ];

      mockScraping.withArgs().returns(Promise.resolve(mockListOfScrapedSongs));
      mockSpotifyFeatures
        .withArgs({})
        .returns(Promise.resolve(mockTopHitsSpotify));

      mockTopTracks = ["AS IT WAS", "BREAK MY SOUL", "ABOUT DAMN TIME"];
    });

    it("Returned correct top Tracks", async function () {
      const actualTopTracks = await songMatching.getTopTracks({});
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
