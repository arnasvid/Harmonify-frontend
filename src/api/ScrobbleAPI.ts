import axios from "axios";

const BaseURL = "/api/scrobble";

const ScrobbleAPI = {
    getTopWeeklyArtists: async (): Promise<any> => {
        let res = await axios.get(`${BaseURL}/top-weekly-artists`);
        return res;
    },
    getTopWeeklyGenres: async (): Promise<any> => {
        let res = await axios.get(`${BaseURL}/top-weekly-genres`);
        return res;
    },
    getWeeklyActivity: async (): Promise<any> => {
        let res = await axios.get(`${BaseURL}/weekly-activity`);
        return res;
    },
};

export default ScrobbleAPI;
