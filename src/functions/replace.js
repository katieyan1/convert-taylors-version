import { getOldSongsFromPlaylist } from "./getOldSongsFromPlaylist";

async function add(playlist_id, tv_song_id, position) {
  let accessToken = localStorage.getItem("access_token");
  let body = {
    uris: ["spotify:track:" + tv_song_id],
    position: position,
  };
  await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function remove(playlist_id, song_id) {
  let accessToken = localStorage.getItem("access_token");
  let body = {
    tracks: [{ uri: "spotify:track:" + song_id }],
  };
  await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function replace(playlist_id) {
  let songs_to_replace = await getOldSongsFromPlaylist(playlist_id);
  console.log("songs to replace" + songs_to_replace);
  for (let song of songs_to_replace) {
    await add(playlist_id, song.tv, song.position);
    await remove(playlist_id, song.old);
  }
}
