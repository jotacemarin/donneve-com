import { useEffect, useState } from "react";
import { getCommands } from "../api/donneve";

export const useGetCommands = (userId) => {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetch(userId) {
    setCommands([]);
    setLoading(true);
    setError(null);

    try {
      const commands = await getCommands(userId);

      setLoading(false);
      setCommands(commands);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetch(userId);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return {
    commands,
    loading,
    error,
  };
};

export default useGetCommands;
