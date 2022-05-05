import axios from "axios";

const { REACT_APP_DONNEVE_API } = process.env;

const filesManager = axios.create({
  baseURL: REACT_APP_DONNEVE_API,
  timeout: 5000,
});

export const getApiKey = async (code) => {
  return new Promise(async (resolve, reject) => {
    filesManager
      .post(`/uploadMedia?code=${code}`)
      .then(({ data: { apiKey } }) => resolve([...apiKey].join("-")))
      .catch(({ response: { data } }) => reject(new Error(`${data.error}, request failed`)));
  });
};

export const setTags = async (remoteId, tags) => {
  const { data } = await filesManager.post("/setTags", { remoteId, tags });
  return data;
};
