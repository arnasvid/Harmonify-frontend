import axios from "axios"
import StatusResponse from "../models/auth/StatusResponse";

const BaseURL = "api/auth"

const AuthAPI = {

    login: async (email: string, password: string) => {
        let res : {accessToken : string, refreshToken : string} = await axios.post(`${BaseURL}/login`, { email, password })
        let access_token = res.accessToken;
		console.log(access_token);

		if (access_token) {
			localStorage.setItem("token", access_token);

			axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
		}
		return res;
    },
	
	getStatus: (): Promise<StatusResponse> => axios.get(`${BaseURL}/status`),

	register: async (username : string, email : string, password : string) => {
		let res : {accessToken : string, refreshToken : string} = await axios.post(`${BaseURL}/register`, { username, email, password })
		let access_token = res.accessToken;
		console.log(access_token);

		if (access_token) {
			localStorage.setItem("token", access_token);

			axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
		}
		return res;
	}

}

export default AuthAPI;