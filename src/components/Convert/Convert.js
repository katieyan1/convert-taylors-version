import React, { useEffect, useState } from "react";
import * as AUTH from "../../constants/auth";
import { replace } from "../../functions/replace";
import { getPlaylists } from "../../functions/getPlaylists";

import "./Convert.css";

const Convert = () => {
  // const [playlistsShown, setPlaylistsShown] = useState(false);
  // const [playlists, setPlaylists] = useState([]);
  const [state, setState] = useState("start");
  async function getAccessToken() {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    let codeVerifier = localStorage.getItem("code_verifier");
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: AUTH.REDIRECT_URI,
      client_id: AUTH.CLIENT_ID,
      code_verifier: codeVerifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
  }
  async function replacePlaylists() {
    setState("loading");
    await getAccessToken();
    const playlists = await getPlaylists();
    playlists.map((playlist) => {
      replace(playlist.id);
    });
    setState("done");
  }
  useEffect(() => {});
  return (
    <div className="container">
      {state === "start" && (
        <button onClick={replacePlaylists}>...Ready For It</button>
      )}
      {state === "loading" && (
        <div>
          <h1>Loading...</h1>
          <h2>
            <em>
              All of this silence and patience, pining and desperately waiting
            </em>
          </h2>
        </div>
      )}
      {state === "done" && <h1>Done!</h1>}
    </div>
  );
};

export default Convert;
