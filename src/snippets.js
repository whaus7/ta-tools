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

useEffect(() => {
  const getWithForOf = async () => {
    console.time("for of");
    const allData = [];
    //for (const [i, v] of ['a', 'b', 'c'].entries()) {
    for (const [i, pair] of allPairs.entries()) {
      const response = await fetch(`https://api.binance.com/api/v3/aggTrades?symbol=${pair.pair}&limit=${pair.limit}`);
      const json = await response.json();
      json.map((d) => {
        if (d.q > 3000) {
          allData.push({
            date: d.T,
            pair: pair.pair,
            size: parseInt(d.q),
            price: parseFloat(d.p),
            maker: d.m,
            color: colors[i],
          });
        }
      });
    }
    console.timeEnd("for of");

    // Sort our aggregated data before we give it to recharts
    allData.sort((a, b) => {
      return a.date - b.date;
    });

    setData(allData);

    console.log(allData);
  };
  getWithForOf();
}, []);

<Card title="recharts">
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
</Card>;
