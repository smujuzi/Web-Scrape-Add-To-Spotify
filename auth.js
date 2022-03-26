var SpotifyWebApi = require("spotify-web-api-node");

clientId = "bdf73ee3f11d400da9a68e04719fec20";
clientSecret = "a90d4d6ec6324cde9f136fabff79f7e4";
redirectUri = "http://localhost:8080/callback";

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

var scopes = [
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "playlist-modify-private",
    "playlist-modify-public",
  ],
  redirectUri = redirectUri,
  clientId = clientId,
  state = "some-state-of-my-choice";
clientSecret = clientSecret;

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

//accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
https: console.log(authorizeURL);

// spotifyApi.setAccessToken(
//   "BQDR5VA_ByAetMrus_ovUJZnWMO_cwWnOH12VCJxoA9tO1K9K0uvkr1FRXt1NYaJCB7V-ONCVrUabe4yu80FgUZjFas93OripK-s9vLVGpisgNzm-KhqO6wbfNXIMn54atEZHVLBiU5QVxV1YPgv0K-rE8BTFaPpnb-4ihrXE9bMFtLCZBiMYJO0FIGgjRP0h1QHpM19jaH3EwD7GBEnpg"
// );
