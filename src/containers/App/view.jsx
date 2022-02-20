import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATH_HOME, PATH_UPLOAD, PATH_DONNEVE_COM } from "../../utils/routes";
import Home from "../Home";
import NotFound from "../404";
import UploadMedia from "../UploadMedia";
import DonneveCom from "../DonneveCom";

export const App = () => {
  const routes = [
    {
      exact: true,
      path: PATH_HOME,
      element: <Home />,
    },
    {
      exact: true,
      path: PATH_UPLOAD,
      element: <UploadMedia />,
    },
    {
      exact: true,
      path: PATH_DONNEVE_COM,
      element: <DonneveCom />,
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
