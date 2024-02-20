import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Login from "./components/Login";
import Genre from "./components/Genre";
import ErrorPage from "./components/ErrorPage";
import Books from "./components/Books";
import Book from "./components/Book";
import Fav from "./components/Fav";
import Registration from "./components/Registration";
import Action from "./components/Genres/Action";
import Comedy from "./components/Genres/Comedy";
import Thriller from "./components/Genres/Thriller";
import FairyTale from "./components/Genres/FairyTale";
import Novel from "./components/Genres/Novel";
import Suspense from "./components/Genres/Suspense";
import AutoBiography from "./components/Genres/AutoBiography";
import ForgotPassword from "./components/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/genre",
        element: <Genre />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/book/:id",
        element: <Book />,
      },
      {
        path: "/fav",
        element: <Fav />,
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
        path: "/action",
        element: <Action />,
      },
      {
        path: "/comedy",
        element: <Comedy />,
      },
      {
        path: "/thriller",
        element: <Thriller />,
      },
      {
        path: "/fairyTale",
        element: <FairyTale />,
      },
      {
        path: "/novel",
        element: <Novel />,
      },
      {
        path: "/suspense",
        element: <Suspense />,
      },
      {
        path: "/autoBiography",
        element: <AutoBiography />,
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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
