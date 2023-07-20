export async function add(playlist_id, tv_song_id, position) {
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
