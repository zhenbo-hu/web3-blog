import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Page/Home";
import Blog from "./Page/Blog";
import { WalletProvider } from "./store/Wallet";
import { BlogEditorStoreProvider } from "./store/BlogStore";
import Edit from "./Page/Edit";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Blog />,
  },
  {
    path: "/:id/edit",
    element: <Edit />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <WalletProvider>
    <BlogEditorStoreProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </BlogEditorStoreProvider>
  </WalletProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
