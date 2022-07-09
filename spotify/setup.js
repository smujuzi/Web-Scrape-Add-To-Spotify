const SpotifyWebApi = require("spotify-web-api-node");
const credentials = require("../credentials-spotify.json");
const spotifyApi = new SpotifyWebApi(credentials);

async function setupAPI() {
  await spotifyApi.refreshAccessToken().then(
    function (data) {
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
