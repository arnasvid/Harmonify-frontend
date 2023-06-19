import axios from "axios";

const baseUrl = "/api/scrobble";

const SpotifyPersonalAPI = {
  getRecentlyPlayed: async () => {
    let res = await axios.get(`${baseUrl}/recently-played`);
    console.log(res);
    return res;
  },
};

export default SpotifyPersonalAPI;
