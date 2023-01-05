import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

export const priceState = atom({
    key: 'Price',
    default: 0,
  });

  export const aggTrades1State = atom({
    key: 'aggTrades1',
    default: [],
  });