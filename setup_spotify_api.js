const SpotifyWebApi = require("spotify-web-api-node");

class refreshSpotifyToken {
  spotifyApi = null;
  constructor() {
    // credentials are optional
    this.spotifyApi = new SpotifyWebApi({
      clientId: "bdf73ee3f11d400da9a68e04719fec20",
      clientSecret: "a90d4d6ec6324cde9f136fabff79f7e4",
      redirectUri: "http://localhost:8080/callback",
      refreshToken:
        "AQBvb1iDTZ-2y_jrsT9BzBgr0O2eJ2ct4vwYNo0KC_Hz7Yoc2Cu0rKV1hP7RRKVtTSknWbE5Enl8agUJE5v2O9mNXDi9HJS0Vp2VqXCfF4Ytfx4Ugxktpxsgo8Q7KPpA2MY",
    });

    this.getToken();

    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    // this.spotifyApi.refreshAccessToken().then(
    //   function (data) {
    //     console.log("The access token has been refreshed!");

    //     // Save the access token so that it's used in future calls
    //     this.spotifyApi.setAccessToken(data.body["access_token"]);
    //     console.log(this.spotifyApi.getAccessToken());

    //     // console.log("Data:");
    //     // console.log(data);
    //     console.log("The access token has been refreshed!");
    //   },
    //   function (err) {
    //     console.log("Could not refresh access token", err);
    //   }
    // );
  }

  async getToken() {
    let data = null;
    try {
      data = await this.spotifyApi.refreshAccessToken();
    } catch {
      console.log("Error occured");
    }
    await this.spotifyApi.setAccessToken(data.body["access_token"]);
    // console.log(this.spotifyApi.getAccessToken());
    // console.log("The access token has been refreshed!");
  }

  getSpotifyAPI() {
    return this.spotifyApi;
  }
}

module.exports = new refreshSpotifyToken();
