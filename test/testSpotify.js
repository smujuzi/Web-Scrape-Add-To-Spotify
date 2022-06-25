const assert = require("chai").assert;
const expect = require("chai").expect;
const spotifySetup = require("../spotify/setup");
const sinon = require("sinon");

describe("Test Spotify Set Up", function () {
  //Good Refresh Token
  let mock;
  describe("Valid Refresh Token 1", function () {
    beforeEach(function () {
      mock = sinon.stub(spotifySetup.spotifyApi, "refreshAccessToken");
      mockAccessToken =
        "BQCJjsvwvFDVEyludzrAQzwcEdQ0uJFNF-QOG60rWAVT0nAUOyW6jEaOVqi7Z4XisVz-yi7H--SwV4WCAbwjgll3dVQ7IqvEKcEHV9OebMZ9sGgDKonJSoMiipcSTNxA4SzJ_084T3fwL7jMe063XEHMfuMCtwguLD4FqxnEemvQaEn2l2f3gBNxZ6Vz3TFRTvGqwEHFxtf4E2qGNe6wFpIjK8u3jdsl-eWnRvRXexy-GbVjn4zM4kTAjHWLr3CC8kA";
      mock.withArgs().returns(
        Promise.resolve({
          body: {
            access_token: mockAccessToken,
          },
        })
      );
    });

    it("Successfully refreshed accessToken", async function () {
      const spotifyApi = await spotifySetup.setupAPI();
      assert.equal(spotifyApi._credentials["accessToken"], mockAccessToken);
    });

    afterEach(function () {
      mock.restore();
      mock.resetHistory();
    });
  });

  describe("Valid Refresh Token 2", function () {
    beforeEach(function () {
      mock = sinon.stub(spotifySetup.spotifyApi, "refreshAccessToken");
      mock
        .withArgs()
        .returns(Promise.reject(new Error("Could not refresh access token")));
    });

    it("Failed to refresh accessToken", async function () {
      try {
        await spotifySetup.setupAPI();
      } catch (err) {
        expect(err.message).to.eql("Could not refresh access token");
      }
    });

    afterEach(function () {
      mock.restore();
      mock.resetHistory();
    });
  });

  describe("Invalid Refresh Token", function () {
    sandbox = sinon.createSandbox();
    beforeEach(function () {
      mock = sinon.stub(spotifySetup.spotifyApi, "refreshAccessToken");
      sandbox
        .stub(spotifySetup.spotifyApi._credentials, "refreshToken")
        .value("1234");

      mock
        .withArgs()
        .returns(
          Promise.reject(
            new Error(
              "An authentication error occurred while communicating with Spotify's Web API." +
                "\nDetails: invalid_grant Invalid refresh token."
            )
          )
        );
    });

    //assert error message displays for inability to refresh access token
    it("Failed to connect to Spotify", async function () {
      try {
        await spotifySetup.setupAPI();
      } catch (err) {
        expect(err.message).to.eql(
          "An authentication error occurred while communicating with Spotify's Web API." +
            "\nDetails: invalid_grant Invalid refresh token."
        );
      }
    });

    afterEach(function () {
      sandbox.restore();
      mock.restore();
      mock.resetHistory();
    });
  });
});

// TESTS TO RUN
/**
 * good refresh token = correct access token returned
 * bad refresh token = WebapiAuthenticationError:  An authentication error occurred while communicating with Spotify's Web API.
 * good refresh token but failure to refresh access token = err:"Could not refresh access token"
 */
