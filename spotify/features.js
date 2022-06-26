async function createTopTracksPLaylist(spotifyAPI, recommendedSongs) {
  playlistID = await newPlaylist(spotifyAPI);
  songs = await getListOfSongs(spotifyAPI, recommendedSongs);
  await addTracksToPlaylist(spotifyAPI, playlistID, songs);
}

// Search playlists whose name or description contains 'Today's Top Hits'. Return first one
async function getTodaysTopHitsPlaylist(spotifyAPI) {
  tracklist = [];
  todaysTopHitsPlaylist = [];
  await spotifyAPI.searchPlaylists("Today's Top Hits").then(
    function (data) {
      todaysTopHitsPlaylist = data.body.playlists.items[0];
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
  tracklist = await getPlaylistSongs(spotifyAPI, todaysTopHitsPlaylist.id);
  return tracklist;
}

//Display Playlist tracks
async function getPlaylistSongs(spotifyAPI, playlistID) {
  tracklist = [];
  await spotifyAPI.getPlaylistTracks(playlistID, { limit: 10 }).then(
    function (data) {
      tracks = data.body.items;
      for (track of tracks) {
        tracklist.push(track.track.name);
      }
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
  return tracklist;
}

// Create a public playlist
async function newPlaylist(spotifyAPI) {
  playlistID = "";
  timeStamp = new Date().toLocaleString().replace(",", "");
  playlistTitle = "AWS Project: " + timeStamp;
  await spotifyAPI
    .createPlaylist(playlistTitle, {
      description: "My description",
      public: true,
    })
    .then(
      function (data) {
        playlistID = data.body.id;
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  return playlistID;
}

// Add tracks to a playlist
async function addTracksToPlaylist(spotifyAPI, playlistID, songs) {
  await spotifyAPI.addTracksToPlaylist(playlistID, songs).then(
    function (data) {
      console.log("Mission accomplished");
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

//Create list of Spotify Songs
async function getListOfSongs(spotifyAPI, songsToSearch) {
  spotifySongs = [];
  for (song of songsToSearch) {
    spotifySongs.push(await searchSong(spotifyAPI, song));
  }

  return spotifySongs;
}

// Search tracks whose name, album or artist contains 'Love'
async function searchSong(spotifyAPI, name) {
  songDetail = "";
  await spotifyAPI.searchTracks(name).then(
    function (data) {
      songDetail = data.body.tracks.items[0].uri;
    },
    function (err) {
      console.error(err);
    }
  );
  return songDetail;
}

module.exports = {
  getTodaysTopHitsPlaylist,
  getPlaylistSongs,
  newPlaylist,
  addTracksToPlaylist,
  createTopTracksPLaylist,
};
