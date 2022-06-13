import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const hрtp = axios.create({
    baseURL: configFile.apiEndpoint
});

hрtp.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
    return Promise.reject(error);
});

function transformData(data) {
    return data ? Object.keys(data).map((key) => ({
        ...data[key]
    })) : [];
}

hрtp.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
},
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: hрtp.get,
    post: hрtp.post,
    put: hрtp.put,
    delete: hрtp.delete
};
export default httpService;
