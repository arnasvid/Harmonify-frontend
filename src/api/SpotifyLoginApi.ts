import axios from "axios";

const BaseURL = "api/spotifylogin";
const BaseURL2 = "api/spotifylogin/callback";

const SpotifyLoginAPI = {
  saveRefreshToken: async (request: {
    refreshToken: string;
    accessToken: string;
  }) => {
    let res = await axios.put(`${BaseURL}/save/refresh`, {
      request,
    });
    console.log(res);

    return res;
  },

  login: async () => {

    let client_id = import.meta.env.VITE_CLIENT_ID;
    let client_secret = import.meta.env.VITE_CLIENT_SECRET;
    let redirect_uri = import.meta.env.VITE_REDIRECT_URI;

    const state = generateRandomString(16);
    const scope = "user-read-private user-read-email user-follow-modify ugc-image-upload playlist-modify-private playlist-modify-public user-library-modify playlist-read-collaborative user-read-currently-playing user-follow-read user-read-playback-position user-read-playback-state playlist-read-private user-read-recently-played user-top-read user-read-email user-library-read user-read-private app-remote-control streaming user-modify-playback-state"; // Add additional scopes as required

    const authURL =
      "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      encodeURIComponent(client_id || "undefined") +
      (scope ? "&scope=" + encodeURIComponent(scope) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri as string) +
      "&state=" +
      encodeURIComponent(state);

    window.location.href = authURL;
  },

  saveSpotifyRefreshToken: async (request: {
    refreshToken: string;
    accessToken: string;
  }) => {
    let res = await axios.post(`${BaseURL}/save/refresh`, {
      request,
    });
    return res;
  },
};

export default SpotifyLoginAPI;

function generateRandomString(length: number): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }

  return randomString;
}
