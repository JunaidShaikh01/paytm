import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import SignupPage, { action as signupAction } from "./pages/SignupPage";
import SigninPage, { action as signinAction } from "./pages/SigninPage";
import DashboardPage, {
  loader as dashboardLoader,
} from "./pages/DashboardPage";
import TransferPage, { action as transferAction } from "./pages/TransferPage";
import UpdatePage, { action as updateAction } from "./pages/UpdatePage";

const router = createBrowserRouter([
  { path: "/", element: <SigninPage />, action: signinAction },
  { path: "/signup", element: <SignupPage />, action: signupAction },
  { path: "/dashboard", element: <DashboardPage />, loader: dashboardLoader },
  { path: "/transfer", element: <TransferPage />, action: transferAction },
  { path: "/update", element: <UpdatePage />, action: updateAction },
  
]);

export default function App() {
  return <RouterProvider router={router} />;
}
