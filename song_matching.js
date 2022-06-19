const scraping = require("./webscrape/scrapeHome");
const spotifyFeatures = require("./spotify/features");
const fuzz = require("fuzzball");

async function getScrapedSongs() {
  console.log("Cheerio waaaaayyy");
  listOfScrapedSongs = [];
  await scraping.runWebscrape().then(function (res) {
    listOfScrapedSongs = scraping.listOfSongs[0]; //removes random blanks
  });
  return listOfScrapedSongs;
}

async function getTopHitsSpotify() {
  topHitsSpotify = await spotifyFeatures.getTodaysTopHitsPlaylist();
  listOfTopHitsSongs = [];
  for (song of topHitsSpotify) {
    listOfTopHitsSongs.push(song);
  }

  return listOfTopHitsSongs;
}

async function getAllSongs() {
  listOfScrapedSongs = await getScrapedSongs();
  listOfTopHitsSongs = await getTopHitsSpotify();

  listOfAllSongs = [];
  for (song of listOfScrapedSongs) {
    listOfAllSongs.push(song);
  }
  for (song of listOfTopHitsSongs) {
    listOfAllSongs.push(song);
  }
  console.log("List of Scraped Songs");
  console.log(listOfScrapedSongs);

  console.log("List of Top Hits Spotify");
  console.log(listOfTopHitsSongs);

  return listOfAllSongs;
}

async function getTopTracks() {
  topTracks = [];
  listOfSongs = await getAllSongs();
  songMap = await createMapTest(listOfSongs);

  console.log("EVERYTHING");
  console.log(listOfSongs);

  for (const [key, value] of songMap.entries()) {
    if (value > 1) {
      topTracks.push(key);
    }
  }

  console.log("Song Map:");
  console.log(songMap);

  console.log("Top Tracks:");
  console.log(topTracks);
  if (topTracks.length == 0) {
    console.log("Track = 0 therefore:");
    console.log(listOfSongs.length);
    console.log(listOfSongs);
    return listOfSongs;
  }
  return topTracks;
}

async function createMapTest(listOfSongs) {
  const songMap = new Map();

  for (song of listOfSongs) {
    songKey = await songSimilarity(song, songMap);

    if (songKey == "N/A") {
      songMap.set(song, 1);
    } else {
      frequencyOfSong = songMap.get(songKey);
      frequencyOfSong++;
      songMap.set(songKey, frequencyOfSong);
    }
  }
  return songMap;
}

async function songSimilarity(currentSong, songMap) {
  result = "N/A";
  for (const [key, value] of songMap.entries()) {
    comparison = fuzz.ratio(currentSong, key);
    if (comparison > 90) {
      result = key;
      break;
    }
  }
  return result;
}

// getTopTracks();

//running up that hill
// falling back

module.exports = {
  getAllSongs,
  getTopTracks,
  getTopHitsSpotify,
};
