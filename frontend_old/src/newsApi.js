import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://api.spaceflightnewsapi.net/v4/",
});

export default newsApi;
