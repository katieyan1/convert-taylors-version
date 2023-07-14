import { Fearless, Red, SpeakNow } from "../constants/songUris";

export async function getOldSongsFromPlaylist(playlist_id) {
  let accessToken = localStorage.getItem("access_token");
  let song_ids = [];
  // get total number of tracks
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=total`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const data = await response.json();
  const total = data.total;

  // add all tracks to song_ids array
  for (let offset = 0; offset < total; offset += 50) {
    const track_response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=items%28track%28id%29%29&limit=50&offset=${offset}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const track_data = await track_response.json();
    console.log("track data: " + track_data);
    const items_arr = await track_data.items;
    // console.log("items_arr: " + JSON.stringify(items_arr));
    for (let item of items_arr) {
      song_ids.push(item.track.id);
    }
  }
  console.log("all song ids" + song_ids);
  let songs_to_replace = [];
  song_ids.map((element, index) => {
    for (let song of Fearless) {
      if (song.old.includes(element)) {
        songs_to_replace.push({ old: element, tv: song.tv, position: index });
      }
    }
    for (let song of Red) {
      if (song.old.includes(element)) {
        songs_to_replace.push({
          old: element,
          tv: song.tv,
          position: index,
        });
      }
    }
    for (let song of SpeakNow) {
      if (song.old.includes(element)) {
        songs_to_replace.push({
          old: element,
          tv: song.tv,
          position: index,
        });
      }
    }
  });
  return songs_to_replace;
}
