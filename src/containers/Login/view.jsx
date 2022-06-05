import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { parse as qsParse } from "query-string";
import classnames from "classnames";
import UserInfo from "../../components/UserInfo";
import * as session from "../../utils/sessionStorage";
import { PATH_HOME, PATH_UPLOAD } from "../../utils/routes";
import "./styles.scss";
import { Link } from "react-router-dom";

const { REACT_APP_HOST, REACT_APP_TELEGRAM_BOT } = process.env;

const USER = "user";

export const Login = ({ withoutParent = false, align = "center" }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = qsParse(search);
  const [user, setUser] = useState();

  const getTgContainer = () => {
    const div = document.getElementById("telegram-widget-container");

    try {
      const telegramScript = document.createElement("script");
      telegramScript.src = "https://telegram.org/js/telegram-widget.js?19";
      telegramScript.async = true;
      telegramScript.setAttribute(
        "data-telegram-login",
        REACT_APP_TELEGRAM_BOT
      );
      telegramScript.setAttribute("data-size", "large");
      telegramScript.setAttribute("data-auth-url", REACT_APP_HOST);
      telegramScript.setAttribute("data-request-access", "write");

      div.innerText = "";
      div.appendChild(telegramScript);
    } catch (error) {
      if (div) {
        div.innerText = "Error telegram script!";
      }
    }
  };

  const getQueryParams = () => {
    const {
      auth_date,
      first_name,
      hash,
      id: telegram_id,
      last_name,
      photo_url,
      username,
    } = queryParams;

    const all = [hash, telegram_id].every((element) => Boolean(element));

    if (all) {
      session.setItem(USER, {
        auth_date,
        first_name,
        hash,
        id: telegram_id,
        last_name,
        photo_url,
        username,
      });

      return navigate(PATH_HOME);
    }

    return null;
  };

  const checkUser = () => setUser(session.getItem(USER));

  useEffect(() => {
    getTgContainer();
    getQueryParams();
    checkUser();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const getUser = () => {
    if (user) {
      console.log("fetch");
    }
  };

  useEffect(() => {
    getUser();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [user]);

  const telegramContainer = () => (
    <div
      id="telegram-widget-container"
      className={classnames({
        "is-flex": true,
        "is-justify-content-center": true,
        "is-hidden": Boolean(user),
      })}
    />
  );

  const renderContent = () => (
    <div className="card-content">
      <div className="content">
        <UserInfo show={Boolean(user)} />
        {telegramContainer()}
      </div>
    </div>
  );

  const renderFooter = () => (
    <footer className="card-footer">
      <Link to={PATH_UPLOAD} className="card-footer-item">
        Upload media {!user ? "with token" : ""}
      </Link>
    </footer>
  );

  const renderCard = () => (
    <div className="card max-width-login">
      {renderContent()}
      {renderFooter()}
    </div>
  );

  if (withoutParent) {
    return renderCard();
  }

  return (
    <div
      className={classnames("is-flex is-mobile", {
        "is-justify-content-center": align === "center",
      })}
    >
      {renderCard()}
    </div>
  );
};

export default Login;
