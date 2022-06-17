import axios from "axios";

const { REACT_APP_DONNEVE_API } = process.env;

export const donneveCom = axios.create({
  baseURL: REACT_APP_DONNEVE_API,
  timeout: 5000,
});

export const getApiKey = async (code) => {
  return new Promise(async (resolve, reject) => {
    donneveCom
      .post(`/uploadMedia?code=${code}`)
      .then(({ data: { apiKey } }) => resolve([...apiKey].join("-")))
      .catch(({ response: { data } }) => reject(new Error(`${data.error}, request failed`)));
  });
};

export const setTags = async (remoteId, tags) => {
  const { data } = await donneveCom.post("/setTags", { remoteId, tags });
  return data;
};

export const getAuth = async (userId) => {
  const { data } = await donneveCom.get("/telegramAuth", { params: { userId } });
  return data;
};
