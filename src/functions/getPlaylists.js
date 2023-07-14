export async function getPlaylists() {
  let accessToken = localStorage.getItem("access_token");
  // get total number of playlists
  const response = await fetch(
    "https://api.spotify.com/v1/me/playlists?limit=1",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const data = await response.json();
  const total = data.total;
  const playlist_ids = getPages(accessToken, total);
  return playlist_ids;
}

async function getPages(accessToken, total) {
  let playlist_ids = [];
  for (let offset = 0; offset < total; offset += 50) {
    const response = await fetch(
      `https://api.spotify.com/v1/me/playlists?limit=50&offset=${offset}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const data = await response.json();
    const items_arr = data.items;
    items_arr.map((item) =>
      playlist_ids.push({ id: item.id, name: item.name })
    );
  }
  return playlist_ids;
}
