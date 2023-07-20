import { Fearless, Red, SpeakNow } from "../constants/songUris";
import { paginate } from "./paginate";

export async function updateUris(playlist_id) {
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
  const track_data = paginate(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=items%28track%28id%29%29`,
    total
  );
  const items_arr = await track_data.items;
  for (let item of items_arr) {
    song_ids.push(item.track.id);
  }
  let updated_song_ids = song_ids.map((element, index) => {
    for (let song of Fearless) {
      if (song.old.includes(element)) {
        return song.tv;
      }
    }
    for (let song of Red) {
      if (song.old.includes(element)) {
        return song.tv;
      }
    }
    for (let song of SpeakNow) {
      if (song.old.includes(element)) {
        return song.tv;
      }
    }
  });
  return updated_song_ids;
}
