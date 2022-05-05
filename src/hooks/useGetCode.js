import { useState } from "react";
import { getApiKey } from "../api/donneve";

export const useGetApiKey = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetch(code) {
    setData(null);
    setLoading(true);
    setError(null);

    try {
      const apiKey = await getApiKey(code);

      setLoading(false);
      setData(apiKey);
    } catch (error) {
      console.log("eas", error);
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

export default useGetApiKey;
