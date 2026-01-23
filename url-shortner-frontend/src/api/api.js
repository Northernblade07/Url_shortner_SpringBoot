import axios from "axios";

const BaseUrl = import.meta.VITE_BACKEND_URL || "http://localhost:8080/";
export default axios.create({
    baseURL: BaseUrl,
});