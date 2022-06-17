import classnames from "classnames";
import { useGetAuth } from "../../hooks";
import "./styles.scss";

export const UserInfo = ({ auth }) => {
  const { id, avatar } = auth;
  const { username, isAdmin, isMember, isCreator, loading } = useGetAuth(id);

  const renderIsMember = () => {
    if (isMember) {
      return <span className="tag is-info mt-1 mr-1">You're ebola</span>;
    }

    return null;
  };

  const renderIsAdmin = () => {
    if (isAdmin) {
      return <span className="tag is-success mt-1 mr-1">You're admin</span>;
    }

    return null;
  };

  const renderIsCreator = () => {
    if (isCreator) {
      return <span className="tag is-dark mt-1 mr-1">You're creator 🔥</span>;
    }

    return null;
  };

  const renderWithoutAuth = () => {
    if (!isMember && !isAdmin) {
      return (
        <span className="tag is-danger mt-1 mr-1">Without authorization</span>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className={classnames({
            "container-avatar-user-info": true,
            "is-flex": true,
            "is-align-items-center": true,
            "is-flex-wrap-wrap": true,
            "is-align-content-center": true,
            "is-justify-content-center": true,
          })}
        >
          <progress className="progress is-small is-primary" max="100">
            15%
          </progress>
        </div>
      );
    }

    return (
      <>
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
          {renderIsCreator()}
          {renderIsAdmin()}
          {renderWithoutAuth()}
        </div>
      </>
    );
  };

  return (
    <div
      className={classnames({
        "is-flex": true,
        "is-flex-direction-column": true,
        "is-align-items-center": true,
      })}
    >
      {renderContent()}
    </div>
  );
};

export default UserInfo;
