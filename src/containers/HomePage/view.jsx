import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parse as qsParse } from "query-string";
import Layout from "../../components/Layout";
import { PATH_UPLOAD } from "../../utils/routes";
import Login from "../Login";

export const HomePage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { token, page } = qsParse(search);
  const [canRedirect, setCanRedirect] = useState(true);

  const navigateTo = () => {
    if (!page && token) {
      return navigate(`${PATH_UPLOAD}?token=${token}`);
    }

    if (page && !token) {
      return navigate(`${`/${page}`}`);
    }

    if (page && token) {
      return navigate(`${`/${page}`}?token=${token}`);
    }

    return setCanRedirect(false);
  };

  useEffect(() => {
    navigateTo();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const content = () => {
    if (canRedirect) {
      return "Redirect...!";
    }

    return <Login />;
  };

  const buttons = [
    {
      key: "steam-external",
      className: "button is-white is-outlined",
      href: "https://steamcommunity.com/groups/e-bolastrike",
      icon: "fab fa-steam",
      label: "Steam group",
    },
  ];

  return (
    <div className="is-relative">
      <Layout buttons={buttons}>{content()}</Layout>
    </div>
  );
};

export default HomePage;
