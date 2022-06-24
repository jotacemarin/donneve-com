import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { PATH_HOME } from "../../utils/routes";
import { useSize } from "../../hooks";
import "./styles.scss";

export const Navbar = ({ fullScreen = false, buttons = [] }) => {
  const { width } = useSize();
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width < 1024);
  }, [width, setIsMobile]);

  const buttonRender = (button, index) => {
    const { key, to, className, icon, label, href } = button;

    const classname = classNames(
      "is-flex is-align-items-center is-align-content-center",
      {
        [className]: !isMobile,
      }
    );

    let content = (
      <Link to={to} className={classname}>
        <span className="icon">
          <i className={icon} />
        </span>
        <span>{label}</span>
      </Link>
    );

    if (href) {
      content = (
        <a href={href} target="_blank" rel="noreferrer" className={classname}>
          <span className="icon">
            <i className={icon} />
          </span>
          {isMobile && <span>{label}</span>}
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
        <div className={classNames("container", { "is-fluid": fullScreen })}>
          <div className="navbar-brand">
            <Link to={PATH_HOME} className="navbar-item">
              <strong>Don Neve</strong>
            </Link>
            <span
              className={classNames("navbar-burger burger", {
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
            className={classNames("navbar-menu", {
              "donneve-navbar-menu": openMenu,
              "is-active": openMenu,
            })}
          >
            <div className="navbar-end">{buttons.map(buttonRender)}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
