import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import Books from "./components/Books";
import Book from "./components/Book";
import Fav from "./components/Fav";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./components/authenticate/AuthContext";
import ProtectedRoute from "./components/authenticate/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id",
        element: <Book />,
      },
      {
        path: "/fav",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <Fav /> }],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Registration />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
