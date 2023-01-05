import React, { useState, useEffect } from 'react';

import { Column } from '@ant-design/plots';
import { Card } from 'antd';

export default function AggTrades() {
    const [pairCount, setPairCount] = useState(0);

    // Bar chart config
    const [chartData, setChartData] = useState([]);

    const chartConfig = {
        isGroup: true,
        xField: 'date',
        yField: 'value',
        seriesField: 'pair',
        //color: ['#1ca9e6', '#f88c24'],
        tooltip: {
            formatter: (data) => {
                console.log('formatter data')
                console.log(data)
                return { 
                    name: data.pair, 
                    value: data.value.toLocaleString("en-US"),
                    title: moment(data.date).format("MM/DD/YYYY") 
                };
            },
        },
        // label: {
        //     position: 'middle',
        //     layout: [
        //     {
        //         type: 'interval-adjust-position',
        //     },
        //     {
        //         type: 'interval-hide-overlap',
        //     },
        //     {
        //         type: 'adjust-color',
        //     },
        //     ],
        // },
    };

    const allPairs = ['XRPUSDT', 'XRPBTC']

    useEffect(() => {
        function fetchData() {
            let formattedData = [];
            allPairs.map(async (p, i) => {
                const response = await fetch(`https://api.binance.com/api/v3/aggTrades?symbol=${p}`);   
                const json = await response.json();
                
                // Format data for chart
                json.map(d => {
                    formattedData.push({
                        pair: p,
                        date: d[0],
                        value: parseInt(d[5]),
                    })
                });

                console.log('json data')
                console.log(formattedData)

                //chartConfig.data = formattedData;
                // console.log('chart config');
                // console.log(formattedData);
                setChartData(formattedData);
                setPairCount(i + 1);
                console.log('setChartData');
                //return formattedData;
            })

            console.log('were here')
            // Get an array of just volume
            //const volume = json.map(d => parseInt(d[5]));

            //setHighestVolume(Math.max(...volume));
            //setAggTrades(json);
        }
        fetchData();
        
        console.log('useEffect in aggTrades fired')
    }, [])

    return <Card title="AggTrades" style={{ width: 300 }}>
        <div style={{padding: 20}}>
            {pairCount ? <Column data={chartData} {...chartConfig} /> : 'loading'}
        </div>
    </Card>
}