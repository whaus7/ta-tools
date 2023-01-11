import React, { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useRecoilValue } from "recoil";
import { aggTradesState } from "../store";
import { PauseCircleOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { Card } from "antd";

export default function AggTrades() {
  const trades = useRecoilValue(aggTradesState);
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
  const colors = ["169, 212, 199", "250, 205, 205", "182, 197, 219"];
  const allPairs = [
    {
      pair: "XRPUSDT",
      limit: 550,
    },
    {
      pair: "XRPBTC",
      limit: 150,
    },
    {
      pair: "XRPBUSD",
      limit: 300,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      //   console.log("payload");
      //   console.log(payload);
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

  // useEffect(() => {
  //   const getWithForOf = async () => {
  //     console.time("for of");
  //     const allData = [];
  //     //for (const [i, v] of ['a', 'b', 'c'].entries()) {
  //     for (const [i, pair] of allPairs.entries()) {
  //       const response = await fetch(`https://api.binance.com/api/v3/aggTrades?symbol=${pair.pair}&limit=${pair.limit}`);
  //       const json = await response.json();
  //       json.map((d) => {
  //         if (d.q > 3000) {
  //           allData.push({
  //             date: d.T,
  //             pair: pair.pair,
  //             size: parseInt(d.q),
  //             price: parseFloat(d.p),
  //             maker: d.m,
  //             color: colors[i],
  //           });
  //         }
  //       });
  //     }
  //     console.timeEnd("for of");

  //     // Sort our aggregated data before we give it to recharts
  //     allData.sort((a, b) => {
  //       return a.date - b.date;
  //     });

  //     setData(allData);

  //     console.log(allData);
  //   };
  //   getWithForOf();
  // }, []);

  return (
    <div>
      <Card
        title={
          <div className="spaceBetween">
            <div>Recent Trades</div>
            <div>{trades.length}</div>
            <PauseCircleOutlined />
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={trades}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
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
              {trades.map((d, i) => {
                return <Cell fill={`rgb(${d.color}, ${d.maker ? 1 : 0.3})`} key={`bar${i}`} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* <Card title="recharts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
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
            <Bar stackId="a" dataKey="size">
              {data.map((d, i) => {
                return <Cell fill={`rgb(${d.color}, ${d.maker ? 1 : 0.3})`} key={`bar${i}`} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card> */}
    </div>
  );
}
