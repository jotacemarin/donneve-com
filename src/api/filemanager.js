import axios from "axios";

const { REACT_APP_FILESMANAGER_API, REACT_APP_ENV } = process.env;

const filesManager = axios.create({
  baseURL: REACT_APP_FILESMANAGER_API,
  timeout: 10000,
});

const IS_DEV = ["test", "dev"].includes(REACT_APP_ENV);
const MOCK_IMG = "1MpPPKvifLSWA_XvKWdlTNZIvPyXrbuvJ";

export const uploadFile = async (formData, apiKey) => {
  if (IS_DEV) {
    return MOCK_IMG;
  }

  const headers = {
    "Content-Type": `multipart/form-data`,
    api_key: apiKey,
  };
  const {
    data: { remoteId },
  } = await filesManager.post("/Files/upload", formData, { headers });
  return remoteId;
};

export const gdl = (remoteId) =>
  `https://drive.google.com/uc?id=${remoteId}&export=download`;
