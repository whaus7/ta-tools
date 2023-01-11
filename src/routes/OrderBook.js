import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Card } from "antd";

import { aggTradesState } from "../store";

export default function OrderBook() {
  const [data, setData] = useRecoilState(aggTradesState);
  //const trades = useRecoilValue(aggTradesState);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/xrpusdt@aggTrade");
    console.log("socket");
    console.log(socket);

    // Listen for messages
    socket.addEventListener("message", (event) => {
      setData((d) => {
        if (d.length > 10) {
          let temp = d.map((x) => x);
          temp.shift();
          return [...temp, JSON.parse(event.data)];
        } else {
          return [...d, JSON.parse(event.data)];
        }
      });
    });
  }, []);

  return (
    <Card title="Order Book">
      <div className="reverseList">
        {data.map((d, i) => {
          return (
            <div key={`entry${i}`}>
              {d.q} {d.p}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
