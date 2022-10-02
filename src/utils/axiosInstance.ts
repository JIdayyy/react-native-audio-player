import axios from "axios";
import * as SecureStore from "expo-secure-store";

async function setAccessToken() {
  const token = await SecureStore.getItemAsync("token");
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
    token || ""
  }`;
}

const createAxiosInstance = () => {
  return axios.create({
    baseURL: "http://192.168.1.18:4000/api/v1",
  });
};

const axiosInstance = createAxiosInstance();

setAccessToken();

export default axiosInstance;
