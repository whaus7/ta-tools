import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const themeState = atom({
  key: "Theme",
  default: "darkAlgorithm",
});

export const pauseState = atom({
  key: "Pause",
  default: false,
});

export const aggTradesState = atom({
  key: "aggTrades",
  default: [],
});

export const snapshotState = atom({
  key: "snapshot",
  default: [],
});

export const takerCounterState = atom({
  key: "takerCounter",
  default: 0,
});

export const makerCounterState = atom({
  key: "makerCounter",
  default: 0,
});
