import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useSize } from "../../hooks";
import { PATH_UPLOAD, PATH_COMMANDS, PATH_MY_STATS } from "../../utils/routes";
import "./styles.scss";

export const LayoutAdmin = ({ children, isAdmin }) => {
  const { width } = useSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width < 1024);
  }, [width, setIsMobile]);

  const asideButtons = [
    {
      enabled: isAdmin,
      key: "manage-commands",
      className: "button is-white is-outlined",
      to: PATH_COMMANDS,
      icon: "fas fa-terminal",
      label: "Manage commands",
    },
    {
      enabled: true,
      key: "my-stats",
      className: "button is-white is-outlined",
      to: PATH_MY_STATS,
      icon: "fas fa-chart-line",
      label: "My stats",
    },
  ];

  const buttons = [
    ...asideButtons.map((button) => ({
      ...button,
      enabled: button.enabled && isMobile,
    })),
    {
      enabled: true,
      key: "upload-media",
      to: PATH_UPLOAD,
      className: "button is-white is-outlined",
      icon: "fas fa-cloud-upload-alt",
      label: "Upload media",
    },
    {
      enabled: true,
      key: "steam-external",
      className: "button is-white is-outlined",
      href: "https://steamcommunity.com/groups/e-bolastrike",
      icon: "fab fa-steam",
      label: "Steam group",
    },
  ];

  const renderLink = (link) => {
    const { key, to, label } = link;

    return (
      <li key={key}>
        <Link to={to} className="donneve-aside-menu-item">
          {label}
        </Link>
      </li>
    );
  };

  const filterButtons = ({ enabled }) => Boolean(enabled);

  const asideMenu = () => {
    if (isMobile) {
      return null;
    }

    const asideFiltered = asideButtons.filter(filterButtons).map(renderLink);

    return (
      <div className="column is-one-fifth">
        <aside className="menu">
          <ul className="menu-list">{asideFiltered}</ul>
        </aside>
      </div>
    );
  };

  return (
    <section className="hero is-info is-fullheight">
      <Navbar fullScreen={!isMobile} buttons={buttons.filter(filterButtons)} />

      <div className="container is-fluid">
        <div className="columns mt-1 mb-1">
          {asideMenu()}
          <div className="column">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default LayoutAdmin;
