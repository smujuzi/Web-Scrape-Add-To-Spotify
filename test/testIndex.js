const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../src/index");
const spotifyFeatures = require("../spotify/features");
const collectSongs = require("../src/song_matching");
const spotifyAPI = require("../spotify/setup");
const credentials = require("../credentials-spotify.json");
const sampleSongs = require("./exampleData/sampleSongs");
const sampleResponses = require("./exampleData/sampleResponses");

describe("Test Index", async function () {
  describe("Handler", async function () {
    let mockSpotifyAPIIndex;
    let mockRecommendedSongs;
    let mockPlaylistCreated;
    let fakeResponse;

    beforeEach(function () {
      mockSpotifyAPIIndex = sinon.stub(spotifyAPI, "setupAPI");
      const fakeSpotifyAPI = {
        _credentials: credentials,
      };
      mockSpotifyAPIIndex.withArgs().returns(Promise.resolve(fakeSpotifyAPI));

      mockRecommendedSongs = sinon.stub(collectSongs, "getTopTracks");
      const fakeRecommendedSongs = sampleSongs.getFakeRecommendedSongs();
      mockRecommendedSongs
        .withArgs(fakeSpotifyAPI)
        .returns(Promise.resolve(fakeRecommendedSongs));

      mockPlaylistCreated = sinon.stub(
        spotifyFeatures,
        "createTopTracksPLaylist"
      );
      fakeResponse = sampleResponses.getFakeResponseThree();
      mockPlaylistCreated
        .withArgs(fakeSpotifyAPI, fakeRecommendedSongs)
        .returns(Promise.resolve(fakeResponse));
    });

    it("Playlist successfully created", async function () {
      const response = await index.handler();
      assert.equal(response, fakeResponse);
    });

    afterEach(function () {
      mockSpotifyAPIIndex.resetHistory();
      mockSpotifyAPIIndex.restore();

      mockRecommendedSongs.resetHistory();
      mockRecommendedSongs.restore();

      mockPlaylistCreated.resetHistory();
      mockPlaylistCreated.restore();
    });
  });
});
