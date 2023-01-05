import React, { useState, useEffect } from 'react';

import { Column } from '@ant-design/plots';
import { Card } from 'antd';

export default function Klines() {
    const [pairCount, setPairCount] = useState(0);
    const [selectedInterval, setSelectedInterval] = useState('1h');
    const [chartData, setChartData] = useState([]);

    const options = [
        {
            label: '1H',
            value: '1h',
        },
        {
            label: '2H',
            value: '2h',
        },
        {
            label: '4H',
            value: '4h',
        },
        {
            label: '8H',
            value: '8h',
        },
        {
            label: '1D',
            value: '1d',
        }
    ];

    // Bar chart config
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
                let d  = new Date(data.date);
                return { 
                    name: data.pair, 
                    value: data.value.toLocaleString("en-US"),
                    title: `${d.toLocaleDateString("en-US")} ${d.toLocaleTimeString("en-US")}`
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

    const allPairs = ['XRPUSDT', 'XRPBTC'];
    

    useEffect(() => {
        function fetchData() {

            let formattedData = [];
            allPairs.map(async (p, i) => {
                const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${p}&interval=${selectedInterval}&limit=60`);   
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

                setChartData(formattedData);
                setPairCount(i + 1);
            })
        }
        fetchData();
    }, [selectedInterval])

    return <Card size="small" title={
    <div style={{display: 'flex'}}>
        <div style={{marginRight: 15}}>Klines</div> 
        <select value={selectedInterval}
        onChange={e => setSelectedInterval(e.target.value)}>
        {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
        ))}
        </select>
    </div>
    }>
        {/* <div>Highest Volume: {highestVolume}</div> */}
        {/* <div id='volumeRow'> */}
        {/* {aggTrades.map((data, i) => {
            return <div key={i} >{data[5]}</div>
        })} */}
        {/* {aggTrades.map((data, i) => {
            return <div style={{height: data[5] / highestVolume * 100}}
            className="baseBar"
             key={i} >{data[5]}</div>
        })} */}
        {/* </div> */}

        
            {pairCount ? <Column data={chartData} {...chartConfig} /> : 'loading'}
    </Card>
}