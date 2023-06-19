import axios from "axios";

const baseUrl = "/api/dashboard";

const SpotifyDashboardAPI = {
    getMonthlyArtists: async () => {
        let res = await axios.get(`${baseUrl}/monthlyArtists`);
        console.log(res);
        return res;
    },

    getMonthlySongs: async () => {
        let res = await axios.get(`${baseUrl}/monthlySongs`);
        console.log(res);
        return res;
    },

    getHalfYearArtists: async () => {
        let res = await axios.get(`${baseUrl}/halfYearArtists`);
        console.log(res);
        return res;
    },

    getHalfYearSongs: async () => {
        let res = await axios.get(`${baseUrl}/halfYearSongs`);
        console.log(res);
        return res;
    },

    getAllTimeArtists: async () => {
        let res = await axios.get(`${baseUrl}/allTimeArtists`);
        console.log(res);
        return res;
    },

    getAllTimeSongs: async () => {
        let res = await axios.get(`${baseUrl}/allTimeSongs`);
        console.log(res);
        return res;
    },

    getMonthlyGenres: async (): Promise<any> => {
        let res = await axios.get(`${baseUrl}/monthly-genres`);
        console.log(res);
        return res;
    },

    getHalfYearGenres: async (): Promise<any> => {
        let res = await axios.get(`${baseUrl}/halfYear-genres`);
        console.log(res);
        return res;
    },

    getAllTimeGenres:  async (): Promise<any> => {
        let res = await axios.get(`${baseUrl}/allTime-genres`);
        console.log(res);
        return res;
    },

};

export default SpotifyDashboardAPI;