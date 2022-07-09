const assert = require("chai").assert;
const sinon = require("sinon");
const spotifyFeatures = require("../spotify/features");
const sampleTracklists = require("./exampleData/sampleTracklists");

describe("Test Spotify Features", async function () {
  describe("Get Today's Top Hits Playlist", async function () {
    let mockSpotifyAPIGet;

    beforeEach(function () {
      mockSpotifyAPIGet = {
        searchPlaylists: sinon.stub(),
        getPlaylistTracks: sinon.stub(),
      };
      mockPlaylist = {
        id: 3,
      };
      const tracklist = sampleTracklists.getTracklistThree();
      mockSpotifyAPIGet.searchPlaylists.withArgs("Today's Top Hits").returns(
        Promise.resolve({
          body: {
            playlists: {
              items: [mockPlaylist],
            },
          },
        })
      );
      mockSpotifyAPIGet.getPlaylistTracks.withArgs(mockPlaylist.id).returns(
        Promise.resolve({
          body: {
            items: tracklist,
          },
        })
      );
    });

    it("Returned the correct top Hits playlist", async function () {
      const actualTracklist = await spotifyFeatures.getTodaysTopHitsPlaylist(
        mockSpotifyAPIGet
      );
      const result = [
        "I Like You (A Happier Song) (with Doja Cat)",
        "First Class",
        "Woman",
      ];
      assert.deepEqual(actualTracklist, result);
    });

    afterEach(function () {
      mockSpotifyAPIGet.searchPlaylists.resetHistory();

      mockSpotifyAPIGet.getPlaylistTracks.resetHistory();
    });
  });
});
