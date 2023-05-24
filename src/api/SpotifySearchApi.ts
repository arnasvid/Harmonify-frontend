import axios from "axios";

const BaseURL = "http://localhost:5173/api/songsPosting";

const PostingSongAPI = {
    getPostSongs: async (): Promise<any> => {
        let res = await axios.get(`${BaseURL}/getPostSongs`);
        return res;
    }
};

export default PostingSongAPI;