import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { PATH_HOME } from "../../utils/routes";
import { LEFT_BUTTONS } from "./constants";
import "./styles.scss";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const buttonRender = (button, index) => {
    const { enabled, key, href, icon, label } = button;

    if (!enabled) {
      return null;
    }

    let content = (
      <Link {...button}>
        <span className="icon">
          <i className={icon} />
        </span>
        <span>{label}</span>
      </Link>
    );

    if (href) {
      content = (
        <a {...button} target="_blank" rel="noreferrer">
          <span className="icon">
            <i className={icon} />
          </span>
        </a>
      );
    }

    return (
      <span className="navbar-item" key={`${key}-${index}`}>
        {content}
      </span>
    );
  };

  return (
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to={PATH_HOME} className="navbar-item">
              <strong>Don Neve</strong>
            </Link>
            <span
              className={classNames({
                "navbar-burger burger": true,
                "is-active": openMenu,
              })}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <div
            className={classNames({
              "navbar-menu": true,
              "is-active": openMenu,
            })}
          >
            <div className="navbar-end">{LEFT_BUTTONS.map(buttonRender)}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
