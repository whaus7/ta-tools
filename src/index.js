import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
//import App from './App';
//import reportWebVitals from "./reportWebVitals";

import Root from "./routes/Root";
import Price from "./routes/Price";
import Klines from "./routes/Klines";
import AggTrades from "./routes/AggTrades";
import Whoops from "./Whoops";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Whoops />,
    children: [
      // {
      //   path: "/price",
      //   element: <Price />,
      //   loader: async () => {
      //     const response = await fetch(
      //       "https://api.binance.com/api/v3/avgPrice?symbol=XRPUSDT"
      //     );
      //     const json = await response.json();
      //     return json.price;
      //   },
      // },
      {
        path: "/klines",
        element: <Klines />,
      },
      {
        path: "/aggtrades",
        element: <AggTrades />,
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
