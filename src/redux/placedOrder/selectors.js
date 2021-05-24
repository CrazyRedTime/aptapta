import { createSelector } from "reselect";

const getPlacedOrderFromState = (state) => {
  return state.placedOrder;
};

export const getPlacedOrderWithMemo = createSelector(
  getPlacedOrderFromState,
  (placedOrder) => placedOrder
);