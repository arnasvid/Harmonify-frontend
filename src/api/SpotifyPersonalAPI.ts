import axios from "axios";

const baseUrl = "http://localhost:5173/api/scrobble";

const SpotifyPersonalAPI = {
  getRecentlyPlayed: async () => {
    let res = await axios.get(`${baseUrl}/recently-played`);
    console.log(res);
    return res;
  },
};

export default SpotifyPersonalAPI;
