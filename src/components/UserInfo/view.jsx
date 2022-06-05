import classnames from "classnames";
import { useEffect, useState } from "react";
import * as session from "../../utils/sessionStorage";
import "./styles.scss";

const ENABLED = false;

export const UserInfo = ({ show, authentication = {} }) => {
  const [user, setUser] = useState(null);

  const getSession = () => {
    if (!show) {
      return null;
    }

    const userLocal = session.getItem("user");

    if (userLocal) {
      const { auth_date: authDate, photo_url: avatar, username } = userLocal;
      const user = { authDate, avatar, username };
      setUser(user);
    }
  };

  useEffect(() => {
    getSession();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [show]);

  const renderIsMember = () => {
    const { isMember } = authentication;
    if (isMember) {
      return <span className="tag is-info mt-1 mr-1">You're ebola</span>;
    }

    return null;
  };

  const renderIsAdmin = () => {
    const { isAdmin } = authentication;
    if (isAdmin) {
      return <span className="tag is-success mt-1 mr-1">You're admin</span>;
    }

    return null;
  };

  const renderWithoutAuth = () => {
    const { isMember, isAdmin } = authentication;
    if (!isMember && !isAdmin && ENABLED) {
      return (
        <span className="tag is-danger mt-1 mr-1">Without authorization</span>
      );
    }

    return null;
  };

  if (!user) {
    return (
      <div className="has-text-centered notification is-info is-light pr-5">
        Please click in telegram button to sign in!
      </div>
    );
  }

  const { avatar, username } = user;

  return (
    <div
      className={classnames({
        "is-flex": true,
        "is-flex-direction-column": true,
        "is-align-items-center": true,
      })}
    >
      <div className="container-avatar-user-info">
        <img src={avatar} alt={username} className="avatar-user-info" />
      </div>
      <button className="button is-info is-rounded username-user-info mt-5">
        @{username}
      </button>
      <div
        className={classnames({
          "is-flex": true,
          "is-align-items-center": true,
          "is-flex-wrap-wrap": true,
          "is-align-content-center": true,
          "is-justify-content-center": true,
        })}
      >
        {renderIsMember()}
        {renderIsAdmin()}
        {renderWithoutAuth()}
      </div>
    </div>
  );
};

export default UserInfo;
