import axios from "axios";

let apiUrl;

if (process.env.REACT_APP_API_ENV === "production") {
  apiUrl = "herokuurl.com";
} else {
  apiUrl = "http://localhost:4000";
}

const instance = axios.create({
  baseURL: apiUrl
});

export default instance;
