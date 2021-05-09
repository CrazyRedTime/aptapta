import { createSelector } from "reselect";

const getRatesFromState = (state) => {
  return state.rates;
};

export const getRatesWithMemo = createSelector(
  [getRatesFromState],
  (rates) => rates
);
