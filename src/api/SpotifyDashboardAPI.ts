import axios from "axios";

const baseUrl = "http://localhost:5173/api/dashboard";

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

};

export default SpotifyDashboardAPI;