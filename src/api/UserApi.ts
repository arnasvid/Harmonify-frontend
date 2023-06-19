import axios from "axios"

const BaseURL = "api/users"

const isUserLoggedIn = localStorage.getItem("token");

const UserAPI = {
	getUsername: (): Promise<string> => {
		if(isUserLoggedIn) {
			return axios.get(`${BaseURL}/username`).then((response : any) => {
                console.log(response)
				return response;
			})
		} else {
			return Promise.resolve("User is not logged in");
		}
	},

	getProfilePicture: (): Promise<string> => {
		if(isUserLoggedIn) {
			return axios.get(`${BaseURL}/getProfilePicture`).then((response : any) => {
				return response.data;
			})
		} else {
			return Promise.resolve("User is not logged in or no profile picture found");
		}
	}

}

export default UserAPI;