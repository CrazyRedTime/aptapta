import { createSelector } from "reselect";

const getPlacedOrderFromState = (state) => {
  return state.placedOrder.order;
};

export const getPlacedOrderWithMemo = createSelector(
  getPlacedOrderFromState,
  (placedOrder) => placedOrder
);

export const getOrderIsFetching = (state) => {
  return state.placedOrder.isFetching;
}