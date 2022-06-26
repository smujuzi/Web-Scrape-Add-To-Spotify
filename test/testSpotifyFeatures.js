const assert = require("chai").assert;
const expect = require("chai").expect;
const spotifySetup = require("../spotify/setup");
const sinon = require("sinon");
const spotifyFeatures = require("../spotify/features");

//Features to Test

//getTodaysTopHitsPlaylist - DONE
//getTracklist
//creating a new playlist
//Search Song uri
//Create a list of spotify songs
//Create Top Tracks Playlist/ Add Tracks to a playlist

describe.only("Test Spotify Features", async function () {
  describe("Get Today's Top Hits Playlist", async function () {
    let mockSpotifyAPI;

    beforeEach(function () {
      mockSpotifyAPI = {
        searchPlaylists: sinon.stub(),
        getPlaylistTracks: sinon.stub(),
      };
      mockPlaylist = {
        id: 3,
      };
      tracklist = [
        {
          track: {
            name: "I Like You (A Happier Song) (with Doja Cat)",
          },
        },
        {
          track: {
            name: "First Class",
          },
        },
        {
          track: {
            name: "Woman",
          },
        },
      ];
      mockSpotifyAPI.searchPlaylists.withArgs("Today's Top Hits").returns(
        Promise.resolve({
          body: {
            playlists: {
              items: [mockPlaylist],
            },
          },
        })
      );
      mockSpotifyAPI.getPlaylistTracks.withArgs(mockPlaylist.id).returns(
        Promise.resolve({
          body: {
            items: tracklist,
          },
        })
      );
    });

    it("Returned the correct top Hits playlist", async function () {
      const actualTracklist = await spotifyFeatures.getTodaysTopHitsPlaylist(
        mockSpotifyAPI
      );
      assert.equal(actualTracklist, tracklist);
    });

    afterEach(function () {
      mockSpotifyAPI.searchPlaylists.resetHistory();
      mockSpotifyAPI.getPlaylistTracks.resetHistory();
    });
  });
});
//********************************************************* */
//********************************************************* */
//********************************************************* */
