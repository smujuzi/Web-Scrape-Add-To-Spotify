const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../index");

const SpotifyWebApi = require("spotify-web-api-node");
const credentials = require("../credentials-spotify.json");
const spotifyApi = new SpotifyWebApi(credentials);
let setupSpotify = require("../spotify/setup");
//*** Set the spotify API variable in set up to this one.
//OR mock the return from the SetupAPI*/

const axios = require("axios");
const path = require("path");
const fs = require("fs");
const htmlRapGenius = fs
  .readFileSync(
    path.resolve(__dirname, "./exampleWebsites/sampleRapGenius.html")
  )
  .toString("utf-8");
const htmlOfficial = fs
  .readFileSync(
    path.resolve(__dirname, "./exampleWebsites/sampleOfficialCharts.html")
  )
  .toString("utf-8");
const htmlMTV = fs
  .readFileSync(path.resolve(__dirname, "./exampleWebsites/sampleMTV.html"))
  .toString("utf-8");
const headers = {
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
};
const mtvURL = "http://www.mtv.co.uk/music/charts";
const officialURL = "https://www.officialcharts.com/charts/singles-chart/";
const rapURL = "https://genius.com/";

describe("Test Integration", async function () {
  this.timeout(20000);
  describe("Project Test", async function () {
    //stub spotifyAPI - > DONE
    //stub getTodaysTopHitsPlaylist - DONE
    //stub searchPlaylists - DONE
    // stub getPlaylistTracks - DONE

    //stub mtv -> DONE
    // stub official charts - > DONE
    //stub rap genius - > DONE

    let mockGet;
    let mockSpotifyAPIIntegration;
    let sandboxSpotifyAPI = sinon.createSandbox();
    let mockSetupSpotify;

    beforeEach(function () {
      mockGet = sinon.stub(axios, "get");
      mockGet
        .withArgs(mtvURL, headers)
        .returns(Promise.resolve({ data: htmlMTV }));
      mockGet
        .withArgs(officialURL, headers)
        .returns(Promise.resolve({ data: htmlOfficial }));

      mockGet
        .withArgs(rapURL, headers)
        .returns(Promise.resolve({ data: htmlRapGenius }));

      mockSpotifyAPIIntegration = {
        _credentials: credentials, //May have to make this sinon.stub() too
        searchPlaylists: sinon.stub(),
        getPlaylistTracks: sinon.stub(),
        createPlaylist: sinon.stub(),
        searchTracks: sinon.stub(),
        addTracksToPlaylist: sinon
          .stub()
          .returns(Promise.resolve({ statusCode: 201 })),
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
      mockSpotifyAPIIntegration.searchPlaylists
        .withArgs("Today's Top Hits")
        .returns(
          Promise.resolve({
            body: {
              playlists: {
                items: [mockPlaylist],
              },
            },
          })
        );
      mockSpotifyAPIIntegration.getPlaylistTracks
        .withArgs(mockPlaylist.id)
        .returns(
          Promise.resolve({
            body: {
              items: tracklist,
            },
          })
        );

      let id = 3;
      let timeStamp = new Date().toLocaleString().replace(",", "");
      let playlistTitle = "AWS Project: " + timeStamp;

      let uriDaytona = "spotify:track:1234";
      let uriChurhillDown = "spotify:track:5678";
      let songs = [uriDaytona, uriChurhillDown];

      let statusCode = 201;

      mockSpotifyAPI.createPlaylist
        .withArgs(playlistTitle, {
          description: "My description",
          public: true,
        })
        .returns(
          Promise.resolve({
            body: {
              id: id,
            },
          })
        );

      mockSpotifyAPI.searchTracks.withArgs("Daytona").returns(
        Promise.resolve({
          body: {
            tracks: {
              items: [
                {
                  uri: uriDaytona,
                },
              ],
            },
          },
        })
      );
      mockSpotifyAPI.searchTracks.withArgs("Churchill Down").returns(
        Promise.resolve({
          body: {
            tracks: {
              items: [
                {
                  uri: uriChurhillDown,
                },
              ],
            },
          },
        })
      );

      //   sandboxSpotifyAPI.stub(setupSpotify, "spotifyApi").value(mockSpotifyAPI);
      //mock setup Spotify return
      mockSetupSpotify = sinon.stub(setupSpotify, "setupAPI");

      mockSetupSpotify.withArgs().returns(mockSpotifyAPIIntegration);
    });

    it("Empty test", async function () {
      console.log("Inside empty test");
      fakeResponse = {
        statusCode: 201,
        songs: [
          "spotify:track:4LRPiXqCikLlN15c3yImP7",
          "spotify:track:2KukL7UlQ8TdvpaA7bY3ZJ",
          "spotify:track:1PckUlxKqWQs3RlWXVBLw3",
        ],
      };
      const response = await index.handler();
      assert.equal(response, fakeResponse);
      assert.equal(1, 1);
    });

    afterEach(function () {
      mockGet.resetHistory();
      mockGet.restore();

      mockSpotifyAPIIntegration.searchPlaylists.resetHistory();
      mockSpotifyAPIIntegration.getPlaylistTracks.resetHistory();
      mockSpotifyAPI.searchTracks.resetHistory();
      mockSpotifyAPI.createPlaylist.resetHistory();
      mockSpotifyAPI.addTracksToPlaylist.resetHistory();

      sandboxSpotifyAPI.resetHistory();
      sandboxSpotifyAPI.restore();

      mockSetupSpotify.resetHistory();
      mockSetupSpotify.restore();

      // let mockGet;
      // let mockSpotifyAPI;
      // let sandboxSpotifyAPI = sinon.createSandbox();
    });
  });
});
