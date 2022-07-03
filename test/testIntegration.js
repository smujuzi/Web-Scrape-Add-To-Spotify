const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../index");

const SpotifyWebApi = require("spotify-web-api-node");
const credentials = require("../credentials-spotify.json");
const spotifyApi = new SpotifyWebApi(credentials);
let setupSpotify = require("../spotify/setup");
//*** Set the spotify API variable in set up to this one.
//OR mock the return from the SetupAPI*/
const spotifyAPIP = require("../spotify/setup");

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


    let mockGet;
    let mockSpotifyAPIIntegration;
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
        {
          track: {
            name: "Bad Habit",
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


      let uriBadHabit = "spotify:track:1234";
      let uriBreakMySoul = "spotify:track:5678";

      mockSpotifyAPIIntegration.createPlaylist.withArgs().returns(
        Promise.resolve({
          body: {
            id: id,
          },
        })
      );

      mockSpotifyAPIIntegration.searchTracks.withArgs("Bad Habit").returns(
        Promise.resolve({
          body: {
            tracks: {
              items: [
                {
                  uri: uriBadHabit,
                },
              ],
            },
          },
        })
      );
      mockSpotifyAPIIntegration.searchTracks.withArgs("BREAK MY SOUL").returns(
        Promise.resolve({
          body: {
            tracks: {
              items: [
                {
                  uri: uriBreakMySoul,
                },
              ],
            },
          },
        })
      );


      mockSetupSpotify = sinon.stub(spotifyAPIP, "setupAPI");

      mockSetupSpotify.withArgs().returns(mockSpotifyAPIIntegration);
    });

    it("Empty test", async function () {
      fakeResponse = {
        statusCode: 201,
        songs: ["spotify:track:1234", "spotify:track:5678"],
      };
      const response = await index.handler();
      assert.deepEqual(response, fakeResponse);
    });

    afterEach(function () {
      mockSetupSpotify.resetHistory();
      mockSetupSpotify.restore();
      mockGet.resetHistory();
      mockGet.restore();

      mockSpotifyAPIIntegration.searchPlaylists.resetHistory();
      mockSpotifyAPIIntegration.getPlaylistTracks.resetHistory();
      mockSpotifyAPIIntegration.searchTracks.resetHistory();
      mockSpotifyAPIIntegration.createPlaylist.resetHistory();
      mockSpotifyAPIIntegration.addTracksToPlaylist.resetHistory();


    });
  });
});
