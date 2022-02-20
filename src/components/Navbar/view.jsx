import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { PATH_HOME, PATH_UPLOAD } from "../../utils/routes";
import "./styles.scss";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

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
            <div className="navbar-end">
              <span className="navbar-item">
                <Link to={PATH_UPLOAD} className="button is-white is-outlined">
                  <span className="icon">
                    <i className="fa fa-book" />
                  </span>
                  <span>Upload media</span>
                </Link>
              </span>
              <span className="navbar-item">
                <a
                  className="button is-white is-outlined"
                  href="https://steamcommunity.com/groups/e-bolastrike"
                  target="_blank"
                >
                  <span className="icon">
                    <i className="fab fa-steam" />
                  </span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
