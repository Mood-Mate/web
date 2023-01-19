import axios from "axios";
import secure from "../secure/secure";

let baseURL = secure.baseUrl;

const httpClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default httpClient;
