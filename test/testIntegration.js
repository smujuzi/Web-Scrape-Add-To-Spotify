const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../index");

const SpotifyWebApi = require("spotify-web-api-node");
const credentials = require("../credentials-spotify.json");
const spotifyApi = new SpotifyWebApi(credentials);

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
  describe("Project Test", async function () {
    //stub spotifyAPI
    //stub getTodaysTopHitsPlaylist
    //stub searchPlaylists
    // stub getPlaylistTracks

    //stub mtv -> DONE
    // stub official charts - > DONE
    //stub rap genius - > DONE

    let mockGet;
    let mockSpotifyAPI;

    beforeEach(function () {
      mockGet = sinon.stub(axios, "get");
      mockGet
        .withArgs(mtvURL, headers)
        .returns(Promise.resolve({ data: htmlMTV }));
      mockGet
        .withArgs(officialURL, headers)
        .returns(Promise.resolve({ data: htmlOfficial }));
    });
      mockGet
        .withArgs(rapURL, headers)
        .returns(Promise.resolve({ data: htmlRapGenius }));
    });

    it('Empty test', async function() {

    })

    afterEach(function() {
      mockGet.resetHistory();
      mockGet.restore();
  })

    //*********** OLD CODE */
    let mockSpotifyAPI;
    let mockRecommendedSongs;
    let mockPlaylistCreated;
    let fakeResponse = {};

    beforeEach(function () {
      mockSpotifyAPI = sinon.stub(spotifyAPI, "setupAPI");
      const fakeSpotifyAPI = {
        _credentials: {
          clientId: "abc",
          clientSecret: "123",
          redirectUri: "http://localhost:8080/callback",
          refreshToken: "aaa",
          accessToken: "bbb",
        },
      };
      mockSpotifyAPI.withArgs().returns(Promise.resolve(fakeSpotifyAPI));

      mockRecommendedSongs = sinon.stub(collectSongs, "getTopTracks");
      const fakeRecommendedSongs = [
        "AS IT WAS",
        "BREAK MY SOUL",
        "ABOUT DAMN TIME",
      ];
      mockRecommendedSongs
        .withArgs(fakeSpotifyAPI)
        .returns(Promise.resolve(fakeRecommendedSongs));

      mockPlaylistCreated = sinon.stub(
        spotifyFeatures,
        "createTopTracksPLaylist"
      );
      fakeResponse = {
        statusCode: 201,
        songs: [
          "spotify:track:4LRPiXqCikLlN15c3yImP7",
          "spotify:track:2KukL7UlQ8TdvpaA7bY3ZJ",
          "spotify:track:1PckUlxKqWQs3RlWXVBLw3",
        ],
      };
      mockPlaylistCreated
        .withArgs(fakeSpotifyAPI, fakeRecommendedSongs)
        .returns(Promise.resolve(fakeResponse));
    });

    it("Playlist successfully created", async function () {
      const response = await index.handler();
      assert.equal(response, fakeResponse);
    });

    afterEach(function () {
      mockSpotifyAPI.resetHistory();
      mockSpotifyAPI.restore();

      mockRecommendedSongs.resetHistory();
      mockRecommendedSongs.restore();

      mockPlaylistCreated.resetHistory();
      mockPlaylistCreated.restore();
    });
  });
});
