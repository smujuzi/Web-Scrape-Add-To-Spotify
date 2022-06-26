let SpotifyWebApi = require("spotify-web-api-node");

// credentials are optional
let spotifyApi = new SpotifyWebApi({
  clientId: "bdf73ee3f11d400da9a68e04719fec20",
  clientSecret: "a90d4d6ec6324cde9f136fabff79f7e4",
  redirectUri: "http://localhost:8080/callback",
  refreshToken:
    "AQBvb1iDTZ-2y_jrsT9BzBgr0O2eJ2ct4vwYNo0KC_Hz7Yoc2Cu0rKV1hP7RRKVtTSknWbE5Enl8agUJE5v2O9mNXDi9HJS0Vp2VqXCfF4Ytfx4Ugxktpxsgo8Q7KPpA2MY",
});

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
  spotifyApi
};
