import React, { useState, useEffect } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { useLoaderData } from "react-router-dom";
import { Card } from "antd";

import { priceState } from "../store";

export default function Price() {
  //const [price, setPrice] = useRecoilState(priceState);
  //const [price, setPrice] = useRecoilState(useLoaderData());
  const price = useLoaderData();

  // useEffect(() => {
  //     async function fetchData() {
  //         const response = await fetch('https://api.binance.com/api/v3/avgPrice?symbol=XRPUSDT');
  //         const json = await response.json();
  //         setPrice(json.price);
  //     }
  //     fetchData();

  //     console.log('useEffect in price fired')
  // }, [])

  return (
    <Card size="small" title="Price" style={{ width: 300 }}>
      <div>{price}</div>
    </Card>
  );
}
