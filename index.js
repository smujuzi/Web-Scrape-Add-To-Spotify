var SpotifyWebApi = require("spotify-web-api-node");

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: "bdf73ee3f11d400da9a68e04719fec20",
  clientSecret: "a90d4d6ec6324cde9f136fabff79f7e4",
  redirectUri: "http://localhost:8080/callback",
  refreshToken:
    "AQBvb1iDTZ-2y_jrsT9BzBgr0O2eJ2ct4vwYNo0KC_Hz7Yoc2Cu0rKV1hP7RRKVtTSknWbE5Enl8agUJE5v2O9mNXDi9HJS0Vp2VqXCfF4Ytfx4Ugxktpxsgo8Q7KPpA2MY",
});

// clientId, clientSecret and refreshToken has been set on the api object previous to this call.
spotifyApi.refreshAccessToken().then(
  function (data) {
    console.log("The access token has been refreshed!");

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
    console.log(spotifyApi.getAccessToken());

    // console.log("Data:");
    // console.log(data);
    console.log("The access token has been refreshed!");
    // getUserPlaylists();
    getCurrentUser();
    console.log("searchPlaylists:");
    searchPlaylists();
  },
  function (err) {
    console.log("Could not refresh access token", err);
  }
);

// console.log(spotifyApi.getAccessToken());
// console.log(spotifyApi.getRefreshToken());
// console.log("Look above me");
// spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
//   function (data) {
//     console.log("Artist albums", data.body);
//   },
//   function (err) {
//     console.error(err);
//   }
// );

// Search playlists whose name or description contains 'workout'
function searchPlaylists() {
  spotifyApi.searchPlaylists("Today's Top Hits").then(
    function (data) {
      playlist = data.body.playlists.items[0];
      displayTracks(playlist.id);
      // console.log("Found playlists are", playlist);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

function displayTracks(playlistID) {
  spotifyApi.getPlaylistTracks(playlistID, { limit: 10 }).then(
    function (data) {
      tracks = data.body.items;
      console.log("Found tracks are:");
      for (track of tracks) {
        console.log(track.track.name);
      }
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

// Get the authenticated user
function getCurrentUser() {
  spotifyApi.getMe().then(
    function (data) {
      console.log("Some information about the authenticated user", data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

// Get a user's playlists
// function getUserPlaylists() {
//   spotifyApi.getUserPlaylists("stuart5971").then(
//     function (data) {
//       console.log("INSIDE GET USER PLAYLISTS");
//       console.log("Retrieved playlists", data.body);
//     },
//     function (err) {
//       console.log("Something went wrong!", err);
//     }
//   );
// }
