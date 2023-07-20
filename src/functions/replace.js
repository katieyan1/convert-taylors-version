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

async function remove(playlist_id, song_ids) {
  let accessToken = localStorage.getItem("access_token");
  let tracks = song_ids.map((id) => {
    return { uri: "spotify:track:" + id };
  });
  let body = {
    tracks: tracks,
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
  songs_to_replace
    .slice()
    .reverse()
    .forEach((song) => {
      add(playlist_id, song.tv, song.position);
    });
  let ids_to_replace = songs_to_replace.map((song) => {
    return song.old;
  });
  await remove(playlist_id, ids_to_replace);
}
