import { useEffect } from "react";
import { useState } from "react";
import Panel from "../../components/Panel";
import { useGetCommands } from "../../hooks";
import Command from "../Command";

export const Commands = ({ user }) => {
  const { idTg } = user;

  const [filteredCommands, setFilteredCommands] = useState([]);

  const { commands } = useGetCommands(idTg);

  useEffect(() => {
    if (commands.length !== 0 && filteredCommands.length === 0) {
      setFilteredCommands(commands);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [commands, filteredCommands]);

  const renderItem = (command, index) => (
    <Command key={`${command}-${index}`} command={command} userId={idTg} />
  );

  const searchCommand = (text) => {
    const filtered = commands.filter((command) => `${command}`.includes(text));
    setFilteredCommands(filtered);
  };

  const renderedCommands = filteredCommands.map(renderItem);

  return (
    <Panel
      heading="Commands"
      items={renderedCommands}
      onChange={searchCommand}
    />
  );
};

export default Commands;
