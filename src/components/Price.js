import React, { useEffect } from "react";
import { Skeleton } from "antd";
import { useRecoilState } from "recoil";
import { aggTradesState, makerCounterState, takerCounterState } from "../store";
import TopLabel from "./TopLabel";

const MAX_HISTORY = 100;

function getColor(pair) {
  switch (pair) {
    case "XRPUSDT":
      return "169, 212, 199";
    case "XRPBUSD":
      return "250, 205, 205";
    case "XRPBTC":
      return "182, 197, 219";
  }
}

export default function Price() {
  const [data, setData] = useRecoilState(aggTradesState);
  const [makerCounter, setMakerCounter] = useRecoilState(makerCounterState);
  const [takerCounter, setTakerCounter] = useRecoilState(takerCounterState);
  //const paused = useRecoilState(pauseState);
  //const [snapshot, setSnapshot] = useRecoilState([]);

  function getLastTrade() {
    return data[data.length - 1].price;
  }

  useEffect(() => {
    // Create WebSocket connection.
    // Single stream
    //const socket = new WebSocket("wss://stream.binance.com:9443/ws/xrpusdt@aggTrade");
    // Multi stream
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=xrpusdt@aggTrade/xrpbusd@aggTrade/xrpbtc@aggTrade"
    );
    console.log("new socket created");
    console.log(socket);

    // Listen for messages
    socket.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      const msgData = msg.data;
      const size = parseInt(msgData.q);

      if (msgData.m) {
        setMakerCounter((m) => m + size);
      } else {
        setTakerCounter((t) => t + size);
      }

      setData((d) => {
        // Format the data for recharts
        const entry = {
          date: msgData.T,
          pair: msgData.s,
          size: size,
          price: parseFloat(msgData.p),
          maker: msgData.m,
          color: getColor(msgData.s),
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

  return data.length > 0 ? (
    <div style={{ display: "flex" }}>
      <TopLabel label="Price" value={getLastTrade()} />
      <div
        style={{
          fontSize: 28,
          alignSelf: "center",
          //color: getLastTrade() >= data[data.length - 2].price ? "green" : "red",
        }}
      >
        {getLastTrade()}
      </div>
    </div>
  ) : (
    <Skeleton.Input active={true} size="small" />
  );
}
