var SpotifyWebApi = require("spotify-web-api-node");

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: "bdf73ee3f11d400da9a68e04719fec20",
  clientSecret: "a90d4d6ec6324cde9f136fabff79f7e4",
  redirectUri: "http://localhost:8080/callback",
});

spotifyApi.setAccessToken(
  "BQDR5VA_ByAetMrus_ovUJZnWMO_cwWnOH12VCJxoA9tO1K9K0uvkr1FRXt1NYaJCB7V-ONCVrUabe4yu80FgUZjFas93OripK-s9vLVGpisgNzm-KhqO6wbfNXIMn54atEZHVLBiU5QVxV1YPgv0K-rE8BTFaPpnb-4ihrXE9bMFtLCZBiMYJO0FIGgjRP0h1QHpM19jaH3EwD7GBEnpg"
);

// spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
//   function (data) {
//     console.log("Artist albums", data.body);
//   },
//   function (err) {
//     console.error(err);
//   }
// );

// Search playlists whose name or description contains 'workout'
// spotifyApi.searchPlaylists("youtube").then(
//   function (data) {
//     console.log("Found playlists are", data.body);
//   },
//   function (err) {
//     console.log("Something went wrong!", err);
//   }
// );

// Get the authenticated user
// spotifyApi.getMe().then(
//   function (data) {
//     console.log("Some information about the authenticated user", data.body);
//   },
//   function (err) {
//     console.log("Something went wrong!", err);
//   }
// );

// Get a user's playlists
spotifyApi.getUserPlaylists("stuart5971").then(
  function (data) {
    console.log("Retrieved playlists", data.body);
  },
  function (err) {
    console.log("Something went wrong!", err);
  }
);
