import React, { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "antd";
import { useRecoilValue, useRecoilState } from "recoil";
import { aggTradesState, snapshotState, pauseState, themeState, makerCounterState, takerCounterState } from "../store";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

import { Card } from "antd";
import TopLabel from "../components/TopLabel";

export default function AggTrades() {
  const theme = useRecoilValue(themeState);
  const trades = useRecoilValue(aggTradesState);
  const makerCounter = useRecoilValue(makerCounterState);
  const takerCounter = useRecoilValue(takerCounterState);
  const [pause, setPause] = useRecoilState(pauseState);
  const [snapshot, setSnapshot] = useRecoilState(snapshotState);

  const colors = ["169, 212, 199", "250, 205, 205", "182, 197, 219"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      let date = new Date(payload[0].payload.date);
      let d = payload[0];

      return (
        <div className="custom-tooltip">
          <p className="label">{`Date : ${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString("en-US")}`}</p>
          <p className="label">{`Pair : ${d.payload.pair}`}</p>
          <p className="label">{`Size : ${d.payload.size}`}</p>
          <p className="label">{`Price : ${d.payload.price}`}</p>
          <p className="label">{`Was the buyer the maker? : ${d.payload.maker ? "Yes" : "No"}`}</p>
        </div>
      );
    }
    return null;
  };

  function renderBars(p) {
    // Which data to present based on if were paused
    const data = p ? snapshot : trades;

    return data.map((d, i) => {
      return <Cell fill={`rgb(${d.color}, ${d.maker ? 1 : 0.3})`} key={`bar${i}`} />;
    });
  }

  return (
    <div>
      <Card
        title={
          <div className="spaceBetween">
            <div className="verticalAlign">Recent Trades</div>
            {trades.length ? (
              <div style={{ display: "flex" }}>
                <TopLabel label="Makers" value={makerCounter.toLocaleString("en-US")} />
                <div className="verticalAlign">vs</div>
                <TopLabel label="Takers" value={takerCounter.toLocaleString("en-US")} />
              </div>
            ) : (
              <Skeleton.Input active={true} size="small" />
            )}
            <div
              className="btn verticalAlign"
              onClick={() => {
                if (pause === false) {
                  let temp = trades.map((x) => x);
                  setSnapshot(temp);
                  setPause(true);
                } else {
                  setPause(false);
                }
              }}
            >
              {pause ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
            </div>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={pause ? snapshot : trades}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" style={{ opacity: theme === "darkAlgorithm" ? 0.1 : 0.3 }} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{
                background: "#fff",
                opacity: 0.8,
                color: "#000",
                padding: "0 10px",
              }}
            />
            <Legend />
            <Bar stackId="a" dataKey="size" isAnimationActive={false}>
              {renderBars(pause)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
