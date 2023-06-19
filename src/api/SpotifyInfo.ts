import axios from "axios";

const BaseURL = "/api/spotifyMainInfo";
const SpotifyInfoAPI = {
  getTop50: async (): Promise<any> => {
    let res = await axios.get(`${BaseURL}/topGlobalSongs`);
    return res;
  },

  getNewReleases: async (): Promise<any> => {
    let res = await axios.get(`${BaseURL}/new-releases`);
    return res;
  },

  getTop1Song: async (): Promise<any> => {
    let res = await axios.get(`${BaseURL}/user/top-1-song`);
    return res;
  },

  getPostSongs: async (): Promise<any> => {
    let res = await axios.get(`api/postingSong/getPostSongs`);
    return res;
  }

};


export default SpotifyInfoAPI;
