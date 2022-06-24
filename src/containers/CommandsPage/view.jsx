import { useEffect, useState } from "react";
import classNames from "classnames";
import LayoutAdmin from "../../components/LayoutAdmin";
import { useSize } from "../../hooks";
import "./styles.scss";
import Commands from "../Commands";

export const CommandsPage = ({ user, isAdmin }) => {
  const { width } = useSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width < 1024);
  }, [width, setIsMobile]);

  const renderCommands = () => {
    if (user && user.idTg) {
      return <Commands user={user} />;
    }

    return null;
  };

  return (
    <div className="is-relative">
      <LayoutAdmin isAdmin={isAdmin}>
        <div className="columns">
          <div
            className={classNames(
              "column is-half-desktop is-offset-one-quarter-desktop",
              {
                "px-0": isMobile,
              }
            )}
          >
            {renderCommands()}
          </div>
        </div>
      </LayoutAdmin>
    </div>
  );
};

export default CommandsPage;
