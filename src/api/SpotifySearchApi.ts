import axios from "axios";

const BaseURL = "/api/songsPosting";

const PostingSongAPI = {
    getPostSongs: async (): Promise<any> => {
        let res = await axios.get(`${BaseURL}/getPostSongs`);
        return res;
    }
};

export default PostingSongAPI;