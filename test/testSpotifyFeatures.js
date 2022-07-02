const assert = require("chai").assert;
const sinon = require("sinon");
const spotifyFeatures = require("../spotify/features");

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
      assert.equal(actualTracklist, tracklist);
    });

    afterEach(function () {
      mockSpotifyAPIGet.searchPlaylists.resetHistory();

      mockSpotifyAPIGet.getPlaylistTracks.resetHistory();
    });
  });

  //Later add scenarios for 0 tracks and one track sent in
  //add a separate "it" just for checking the status code response
  // describe.only("Create Top Tracks Playlist(2 recommended sent in)", async function () {
  //   let mockSpotifyAPI;
  //   let mockRecommendedSongs;

  //   beforeEach(function () {
  //     mockSpotifyAPI = {
  //       createPlaylist: sinon.stub(),
  //       searchTracks: sinon.stub(),
  //       addTracksToPlaylist: sinon
  //         .stub()
  //         .returns(Promise.resolve({ statusCode: 201 })),
  //     };

  //     mockRecommendedSongs = ["Daytona", "Churchill Down"];

  //     let id = 3;
  //     let timeStamp = new Date().toLocaleString().replace(",", "");
  //     let playlistTitle = "AWS Project: " + timeStamp;

  //     let uriDaytona = "spotify:track:1234";
  //     let uriChurhillDown = "spotify:track:5678";
  //     let songs = [uriDaytona, uriChurhillDown];

  //     let statusCode = 201;

  //     mockSpotifyAPI.createPlaylist
  //       .withArgs(playlistTitle, {
  //         description: "My description",
  //         public: true,
  //       })
  //       .returns(
  //         Promise.resolve({
  //           body: {
  //             id: id,
  //           },
  //         })
  //       );
  //     //different uris for each argument
  //     mockSpotifyAPI.searchTracks.withArgs("Daytona").returns(
  //       Promise.resolve({
  //         body: {
  //           tracks: {
  //             items: [
  //               {
  //                 uri: uriDaytona,
  //               },
  //             ],
  //           },
  //         },
  //       })
  //     );
  //     mockSpotifyAPI.searchTracks.withArgs("Churchill Down").returns(
  //       Promise.resolve({
  //         body: {
  //           tracks: {
  //             items: [
  //               {
  //                 uri: uriChurhillDown,
  //               },
  //             ],
  //           },
  //         },
  //       })
  //     );
  //   });
  //   //check if playlist was created
  //   //check if songs are there?
  //   it("Returned the correct top Tracks playlist", async function () {
  //     const response = await spotifyFeatures.createTopTracksPLaylist(
  //       mockSpotifyAPI,
  //       mockRecommendedSongs
  //     );
  //     assert.equal(response.statusCode, statusCode); //Status Code 201	Created - The request has been fulfilled and resulted in a new resource being created.
  //     assert.equal(response.songs, songs);
  //   });

  //   afterEach(function () {
  //     mockSpotifyAPI.searchTracks.resetHistory();

  //     mockSpotifyAPI.createPlaylist.resetHistory();

  //     mockSpotifyAPI.addTracksToPlaylist.resetHistory();
  //   });
  // });
});
