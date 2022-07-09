async function createTopTracksPLaylist(spotifyAPI, recommendedSongs) {
  const playlistID = await newPlaylist(spotifyAPI);
  const songs = await getListOfSpotifySongs(spotifyAPI, recommendedSongs);
  const statusCode = await addTracksToPlaylist(spotifyAPI, playlistID, songs);

  return { statusCode, songs };
}

async function getTodaysTopHitsPlaylist(spotifyAPI) {
  let tracklist = [];
  let todaysTopHitsPlaylist = [];
  await spotifyAPI.searchPlaylists("Today's Top Hits").then(
    function (data) {
      todaysTopHitsPlaylist = data.body.playlists.items[0];
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
  tracklist = await getPlaylistTracks(spotifyAPI, todaysTopHitsPlaylist.id);
  return tracklist;
}

async function getPlaylistTracks(spotifyAPI, playlistID) {
  let tracklist = [];
  await spotifyAPI.getPlaylistTracks(playlistID, { limit: 10 }).then(
    function (data) {
      const tracks = data.body.items;
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

async function newPlaylist(spotifyAPI) {
  let playlistID = "";
  const timeStamp = new Date().toLocaleString().replace(",", "");
  const playlistTitle = "AWS Project: " + timeStamp;
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

async function addTracksToPlaylist(spotifyAPI, playlistID, songs) {
  let statusCode = "";
  await spotifyAPI.addTracksToPlaylist(playlistID, songs).then(
    function (data) {
      statusCode = data.statusCode;
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
  return statusCode;
}

async function getListOfSpotifySongs(spotifyAPI, songsToSearch) {
  let spotifySongs = [];
  for (song of songsToSearch) {
    spotifySongs.push(await searchSong(spotifyAPI, song));
  }
  return spotifySongs;
}

async function searchSong(spotifyAPI, name) {
  let songUri = "";
  await spotifyAPI.searchTracks(name).then(
    function (data) {
      songUri = data.body.tracks.items[0].uri;
    },
    function (err) {
      console.error(err);
    }
  );
  return songUri;
}

module.exports = {
  getTodaysTopHitsPlaylist,
  createTopTracksPLaylist,
};
