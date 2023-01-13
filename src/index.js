import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import "./index.css";
//import reportWebVitals from "./reportWebVitals";
import Root from "./routes/root";
import Klines from "./routes/klines";
import AggTrades from "./routes/aggTrades";
import Whoops from "./Whoops";
import OrderBook from "./routes/orderBook";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Whoops />,
    children: [
      {
        path: "/order_book",
        element: <OrderBook />,
        // loader: async () => {
        //   const response = await fetch(
        //     "https://api.binance.com/api/v3/avgPrice?symbol=XRPUSDT"
        //   );
        //   const json = await response.json();
        //   return json.price;
        // },
      },
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

root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
