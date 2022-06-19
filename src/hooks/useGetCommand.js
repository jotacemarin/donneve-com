import { useEffect, useState } from "react";
import { getCommand } from "../api/donneve";

export const useGetCommand = (command, userId) => {
  const [key, setKey] = useState(null);
  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetch(command, userId) {
    setKey(null);
    setValue(false);
    setLoading(true);
    setError(null);

    try {
      const { key, value } = await getCommand(command, userId);

      setLoading(false);
      setKey(key);
      setValue(value);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetch(command, userId);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return {
    key,
    value,
    loading,
    error,
  };
};

export default useGetCommand;
