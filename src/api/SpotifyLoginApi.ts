import axios from "axios"

const BaseURL = "api/spotifylogin/login"

const SpotifyLoginAPI = {

    login: async (code: string) => {
        let res : {accessToken : string, refreshToken : string, needToRedirectBack : boolean} = await axios.post(`${BaseURL}`, { code })
        let access_token = res.accessToken;
        console.log(access_token);
        if (access_token) {
            localStorage.setItem("SpotifyToken", access_token);

            axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        }
        return res;
    },



}
export default SpotifyLoginAPI;