export async function updatePlaylist(playlist_id) {
  let accessToken = localStorage.getItem("access_token");
  let body = {
    uris: updateUris(playlist_id).map((item) => {
      return "spotify:track:" + item;
    }),
  };
  await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
