const assert = require("chai").assert;
const expect = require("chai").expect;
const spotifySetup = require("../spotify/setup");
const sinon = require("sinon");
const spotifyFeatures = require("../spotify/features");

//Features to Test

//getTodaysTopHitsPlaylist
//getTracklist
//creating a new playlist
//Search Song uri
//Create a list of spotify songs
//Create Top Tracks Playlist/ Add Tracks to a playlist

// const myObject = {
//   hello: "world",
// };

// sandbox.stub(myObject, "hello").value("Sinon");

// console.log(myObject.hello);
// // Sinon

// sandbox.restore();
// console.log(myObject.hello);
// world

describe.only("Test Spotify Features", async function () {
  describe("Get Today's Top Hits Playlist", async function () {
    let mockSpotifyAPI;

    beforeEach(function () {
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
      // TODO:  const callback = sinon.stub();
      //     callback.withArgs(42).returns(1);
      //     callback.withArgs(1).throws("name");
      mockSpotifyAPI = {
        searchPlaylists: sinon.stub().returns(
          Promise.resolve({
            body: {
              playlists: {
                items: [mockPlaylist],
              },
            },
          })
        ),
        getPlaylistTracks: sinon.stub().returns(
          Promise.resolve({
            body: {
              items: tracklist,
            },
          })
        ),
      };
    });

    it("Returned the correct top Hits playlist", async function () {
      const actualTracklist = await spotifyFeatures.getTodaysTopHitsPlaylist(
        mockSpotifyAPI
      );
      //assert.equal(2, 5);
      console.log("actual:", actualTracklist);
      console.log("expected:", tracklist);

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
