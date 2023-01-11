import React, { useState, useEffect } from "react";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { useLoaderData } from "react-router-dom";

import { aggTradesState } from "../store";

const MAX_HISTORY = 50;

export default function Price() {
  const [data, setData] = useRecoilState(aggTradesState);

  useEffect(() => {
    // Create WebSocket connection.
    //const socket = new WebSocket("wss://stream.binance.com:9443/ws/xrpusdt@aggTrade");
    const socket = new WebSocket("wss://stream.binance.com:9443/stream?streams=xrpusdt@aggTrade/xrpbusd@aggTrade");
    console.log("new socket created");
    console.log(socket);

    // Listen for messages
    socket.addEventListener("message", (event) => {
      setData((d) => {
        const msg = JSON.parse(event.data);
        const msgData = msg.data;

        // Format the data for recharts
        const entry = {
          date: msgData.T,
          pair: msgData.s,
          size: parseInt(msgData.q),
          price: parseFloat(msgData.p),
          maker: msgData.m,
          color: msgData.s === "XRPUSDT" ? "169, 212, 199" : "250, 205, 205",
        };

        // Cap the number of messages that are stored locally
        if (d.length > MAX_HISTORY) {
          let temp = d.map((x) => x);
          temp.shift();
          return [...temp, entry];
        } else {
          return [...d, entry];
        }
      });
    });
  }, []);

  return data.length > 0 ? <div>Price: {data[data.length - 1].price}</div> : "connecting to stream...";
}
