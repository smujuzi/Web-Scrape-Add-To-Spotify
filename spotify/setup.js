const SpotifyWebApi = require("spotify-web-api-node");
const credentials = require("../credentials-spotify.json");
let spotifyApi;

async function setupAPI() {

  if(!spotifyApi)
  {
    spotifyApi = new SpotifyWebApi(credentials);
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body["access_token"]);
  }
  
  return spotifyApi;
}

module.exports = {
  setupAPI,
};
