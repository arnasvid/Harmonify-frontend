import axios from "axios";

const BaseURL = "/api/dataXmlPdf";

const DataXmlPdfAPI = {
    dataPdf: async (): Promise<any> => {
        let res = await axios.get(`${BaseURL}/dataPdf`);

        return res;
    },
};

export default DataXmlPdfAPI;
