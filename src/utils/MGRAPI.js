import axios from "axios";
import config from '../config';

export default axios.create({
  baseURL: config.MGR_API_URL,
  responseType: "json"
});
