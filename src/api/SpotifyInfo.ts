import axios from "axios";

const BaseURL = "http://localhost:5173/api/spotifyMainInfo";
const SpotifyInfoAPI = {
  getTop50: async (): Promise<any> => {
    let res = await axios.get(`${BaseURL}/topGlobalSongs`);
    return res;
  },

  getNewReleases: async (): Promise<any> => {
    let res = await axios.get(`${BaseURL}/new-releases`);
    return res;
  }
};

export default SpotifyInfoAPI;
