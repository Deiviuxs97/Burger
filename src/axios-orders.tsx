import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-1c0e3.firebaseio.com/",
});

export default instance;
