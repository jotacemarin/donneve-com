import { useEditCommand, useGetCommand } from "../../hooks";
import PanelItem from "../../components/PanelItem";
import { useState } from "react";
import { useEffect } from "react";

export const Command = ({ command, userId }) => {
  const [currentValue, setCurrentValue] = useState(false);
  const { value, loading: loadingGet } = useGetCommand(command, userId);
  const {
    nextValue,
    refetch,
    loading: loadingEdit,
  } = useEditCommand(command, userId);

  useEffect(() => {
    setCurrentValue(value);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [value]);

  useEffect(() => {
    if (nextValue !== null) {
      setCurrentValue(nextValue);
    }
  }, [nextValue]);

  const changeValue = () => {
    const value = !currentValue;
    refetch(value);
    setCurrentValue(value);
  };

  return (
    <PanelItem
      icon="fad fa-atlas"
      label={command}
      checkbox={currentValue}
      onChange={changeValue}
      disabled={loadingGet || loadingEdit}
    />
  );
};

export default Command;
