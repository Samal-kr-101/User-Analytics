import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


import api from "./api";

api.get("/api/events")
  .then((res) => console.log(res.data));