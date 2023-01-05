import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./Whoops";
//import reportWebVitals from './reportWebVitals';
import Price from "./routes/Price";
import Klines from "./routes/Klines";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "price",
        element: <Price />,
        loader: async () => {
          const response = await fetch(
            "https://api.binance.com/api/v3/avgPrice?symbol=XRPUSDT"
          );
          const json = await response.json();
          return json.price;
        },
      },
      {
        path: "klines",
        element: <Klines />,
      },
    ],
  },
]);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
