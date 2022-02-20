import axios from "axios";

const { REACT_APP_DONNEVE_API } = process.env;

const filesManager = axios.create({
  baseURL: REACT_APP_DONNEVE_API,
  timeout: 5000,
});

export const getApiKey = async (code) => {
  const {
    data: { apiKey },
  } = await filesManager.post(`/uploadMedia?code=${code}`);
  return [...apiKey].join("-");
};

export const setTags = async (remoteId, tags) => {
  const { data } = await filesManager.post("/setTags", { remoteId, tags });
  return data;
};
