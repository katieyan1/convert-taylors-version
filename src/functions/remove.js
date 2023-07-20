export async function remove(playlist_id, song_ids) {
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
