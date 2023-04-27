import axios, {AxiosError} from 'axios';
import { commonActions } from '../redux/store/common/slice'

export default function setupAxios() {
    const handleResponseError = async (error: AxiosError) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
            // dispatch(commonActions.handleLogin(false));
			console.error(error.message);
		} else {
			console.error(error.response?.data || error.message);

			return await Promise.reject(error.message);
		}
	};
    
    const handleRequestError = async (error: AxiosError) => {
		console.error(error.message);
		return await Promise.reject(error.message);
	};

    axios.interceptors.response.use(
		(response) => response.data,
		handleResponseError
	);

    axios.interceptors.request.use((config) => {
		const token = localStorage.getItem("token");
		if (token) {
			if (config.headers) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				config.headers["Authorization"] = `Bearer ${token}`;
			}
		}
		return config;
	}, handleRequestError);

    axios.interceptors.response.use((response) => response, handleResponseError);

    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}