import React from "react";
import Home from "../Home";
import Dashboard from "../Dashboard";
import Edit from "../Edit";
import AddBook from "../AddBook";
import { Navigate } from "react-router-dom";
import TopBar from "../common/TopBar";
import FullDetails from "../common/FullDetails";


const AppRoutes = [
  {
    path: "/",
    exact: true,
    element: <> <TopBar/> <Home /> </>,
  },
  {
    path: "/dashboard",
    exact: true,
    element: <> <TopBar/> <Dashboard/> </>,
  },
  {
    path: "/edit/:id",
    exact: true,
    element: <> <TopBar/> <Edit /> </>,
  },
  {
    path: "/add-book",
    exact: true,
    element: <> <TopBar/> <AddBook /> </>,
  },
  {
    path: "/full-details/:id",
    exact: true,
    element: <> <TopBar/> <FullDetails /> </>,
  },
  {
    path: "/*",
    exact: true,
    element: <Navigate to="/" />,
  },
];

export default AppRoutes;
