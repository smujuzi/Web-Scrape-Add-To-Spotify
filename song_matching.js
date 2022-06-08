const scraping = require("./webscrape/scrape_name");
const spotifyFeatures = require("./spotify/features");
const fuzz = require("fuzzball");

async function getScrapedSongs() {
  allScrapedWebsites = await scraping.runWebscrape();
  listOfScrapedSongs = [];
  for (website of allScrapedWebsites) {
    scrapedSongs = website.currentHits;
    for (song of scrapedSongs) {
      listOfScrapedSongs.push(song);
    }
  }
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

  return listOfAllSongs;
}

async function getTopTracks() {
  topTracks = [];
  listOfSongs = await getAllSongs();
  //songMap = await createMap(listOfSongs);
  songMap = await createMapTest(listOfSongs);

  for (const [key, value] of songMap.entries()) {
    if (value > 1) {
      topTracks.push(key);
    }
  }
  if (topTracks.length == 0) {
    console.log("Track = 0 therefore:");
    console.log(listOfSongs.length);
    console.log(listOfSongs);
    return listOfSongs;
  }
  return topTracks;
}

// async function createMap(listOfSongs) {
//   const songMap = new Map();

//   for (song of listOfSongs) {
//     if (!songMap.has(song)) {
//       songMap.set(song, 1);
//     } else {
//       frequencyOfSong = songMap.get(song);
//       frequencyOfSong++;
//       songMap.set(song, frequencyOfSong);
//     }
//   }

//   return songMap;
// }

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

module.exports = {
  getAllSongs,
  getTopTracks,
  getTopHitsSpotify,
};
