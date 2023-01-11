import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const priceState = atom({
  key: "Price",
  default: 0,
});

export const aggTradesState = atom({
  key: "aggTrades",
  default: [],
});
