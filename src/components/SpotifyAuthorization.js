import * as AUTH from "../constants/auth";

function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function base64encode(string) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export const SpotifyAuthorization = () => {
  let codeVerifier = generateRandomString(128);

  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    let state = generateRandomString(16);
    let scope =
      "playlist-read-private playlist-modify-private playlist-modify-public";
    localStorage.setItem("code_verifier", codeVerifier);
    let args = new URLSearchParams({
      response_type: "code",
      client_id: AUTH.CLIENT_ID,
      scope: scope,
      redirect_uri: AUTH.REDIRECT_URI,
      state: state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });
    console.log(args);
    window.location = "https://accounts.spotify.com/authorize?" + args;
  });
};
