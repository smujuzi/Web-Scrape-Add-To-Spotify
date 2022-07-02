const SpotifyWebApi = require("spotify-web-api-node");
const credentials = require("../credentials-spotify.json");
const spotifyApi = new SpotifyWebApi(credentials);

async function setupAPI() {
  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  await spotifyApi.refreshAccessToken().then(
    function (data) {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
    },
    function (err) {
      throw err;
    }
  );

  return spotifyApi;
}

module.exports = {
  setupAPI,
  spotifyApi,
};
