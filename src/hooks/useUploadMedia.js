import { useState } from "react";
import { uploadFile } from "../api/filemanager";
import { setTags } from "../api/donneve";

export const useUploadMedia = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetch(code, file, tags) {
    setData(null);
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("formFile", file);

      const remoteId = await uploadFile(formData, code);
      const response = await setTags(remoteId, tags);

      setLoading(false);
      setData(response);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  const refetch = async (nextCode, nextFile, nextTags) => {
    await fetch(nextCode, nextFile, nextTags);
  };

  const clear = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    refetch,
    clear,
  };
};

export default useUploadMedia;
