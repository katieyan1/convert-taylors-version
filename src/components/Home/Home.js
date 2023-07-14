import React from "react";
import { SpotifyAuthorization } from "../SpotifyAuthorization";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <h1>
        <span>
          Convert the Taylor Swift songs in your Spotify playlists to<br></br>
        </span>
        <span className="tv">Taylor's Version</span>
      </h1>
      <button onClick={SpotifyAuthorization}>Login to Spotify</button>
    </div>
  );
};

export default Home;
