const refreshSpotifyToken = require("./setup_spotify_api");

getUserPlaylists();
// Get a user's playlists
async function getUserPlaylists() {
  const spotifyApi = await refreshSpotifyToken.getSpotifyAPI();

  spotifyApi.getUserPlaylists("stuart5971").then(
    function (data) {
      console.log("INSIDE GET USER PLAYLISTS");
      //   console.log("Retrieved playlists", data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

console.log("At bottom");
