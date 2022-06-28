import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import * as session from "../../utils/sessionStorage";
import { useGetAuth } from "../../hooks";
import { PATH_HOME } from "../../utils/routes";

const USER = "user";

export const WithAuth = (WrappedComponent) => {
  const AuthHOC = () => {
    const navigate = useNavigate();
    const sessionUser = session.getItem(USER);
    const { id, avatar } = sessionUser ?? {};
    const { isAdmin, loading, data, error } = useGetAuth(id);
    const user = { ...data, avatar };

    useEffect(() => {
      if (!loading && error) {
        navigate(PATH_HOME);
      }
    }, [loading, error, navigate]);

    return (
      <>
        {!loading && <WrappedComponent user={user} isAdmin={isAdmin} />}
        <div className={classNames({ pageloader: true, "is-active": loading })}>
          <span className="title">Loading...</span>
        </div>
      </>
    );
  };

  return <AuthHOC />;
};

export default WithAuth;
