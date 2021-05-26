import { createSelector } from "reselect";

const getRatesFromState = (state) => {
  return state.rates.rates;
};

export const getRatesWithMemo = createSelector(
  [getRatesFromState],
  (rates) => rates
);

export const getRatesIsFetching = (state) => {
  return state.rates.isFetching;
};
