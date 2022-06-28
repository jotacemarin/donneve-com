import { useState } from "react";
import { editCommand } from "../api/donneve";

export const useEditCommand = (command, userId) => {
  const [key, setKey] = useState(null);
  const [currentRawValue, setCurrentRawValue] = useState(null);
  const [nextRawValue, setNextRawValue] = useState(null);
  const [nextValue, setNextValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetch(command, value, userId) {
    setKey(null);
    setCurrentRawValue(null);
    setNextRawValue(null);
    setNextValue(null);
    setLoading(true);
    setError(null);

    try {
      const {
        key,
        currentRawValue,
        nextRawValue,
        nextValue
      } = await editCommand(command, value, userId);

      setLoading(false);
      setKey(key);
      setCurrentRawValue(currentRawValue);
      setNextRawValue(nextRawValue);
      setNextValue(nextValue);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  const refetch = async (commandValue) => {
    await fetch(command, commandValue, userId);
  };

  const clear = () => {
    setKey(null);
    setCurrentRawValue(null);
    setNextRawValue(null);
    setNextValue(null);
    setLoading(false);
    setError(null);
  };

  return {
    key,
    currentRawValue,
    nextRawValue,
    nextValue,
    loading,
    error,
    refetch,
    clear,
  };
};

export default useEditCommand;
