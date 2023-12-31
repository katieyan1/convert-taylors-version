export async function paginate(endpoint, total) {
  let accessToken = localStorage.getItem("access_token");
  for (let offset = 0; offset < total; offset += 50) {
    const response = await fetch(`${endpoint}&limit=50&offset=${offset}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const data = await response.json();
    return data;
  }
}
