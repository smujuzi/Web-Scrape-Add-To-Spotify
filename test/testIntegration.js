const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../src/index");
const credentials = require("../credentials-spotify.json");
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

const sampleTracklists = require("./exampleData/sampleTracklists");
const sampleResponses = require("./exampleData/sampleResponses");

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
        _credentials: credentials,
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
      const tracklist = sampleTracklists.getTracklistFour();
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

      const id = 3;

      const uriBadHabit = "spotify:track:1234";
      const uriBreakMySoul = "spotify:track:5678";

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
      const response = await index.handler();
      const fakeResponse = sampleResponses.getFakeResponseTwo();
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
