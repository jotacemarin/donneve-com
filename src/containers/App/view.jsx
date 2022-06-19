import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  PATH_HOME,
  PATH_UPLOAD,
  PATH_COMMANDS,
  PATH_DASHBOARD,
  PATH_MY_STATS,
} from "../../utils/routes";
import WithAuth from "../../hoc/WithAuth";
import HomePage from "../HomePage";
import NotFound from "../404Page";
import UploadMedia from "../UploadMediaPage";
import DashboardPage from "../DashboardPage";
import CommandsPage from "../CommandsPage";
import MyStatsPage from "../MyStatsPage";

export const App = () => {
  const routes = [
    {
      exact: true,
      path: PATH_HOME,
      element: <HomePage />,
    },
    {
      exact: true,
      path: PATH_UPLOAD,
      element: <UploadMedia />,
    },
    {
      exact: true,
      path: PATH_DASHBOARD,
      element: WithAuth(DashboardPage),
    },
    {
      exact: true,
      path: PATH_COMMANDS,
      element: WithAuth(CommandsPage),
    },
    {
      exact: true,
      path: PATH_MY_STATS,
      element: WithAuth(MyStatsPage),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
