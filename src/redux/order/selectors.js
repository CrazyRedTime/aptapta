import { createSelector } from "reselect";

const getCurrentCity = (state) => {
  return state.order.currentCity;
};

export const getCurrentCityWithMemo = createSelector(
  [getCurrentCity],
  (currentCity) => currentCity
);

const getCurrentAddress = (state) => {
  return state.order.currentAddress;
};

export const getCurrentAddressWithMemo = createSelector(
  [getCurrentAddress],
  (currentAddress) => currentAddress
);

export const getMapStageIsCompleted = (state) => {
  return state.order.mapStageIsCompleted;
};

export const getCarStageIsCompleted = (state) => {
  return state.order.carStageIsCompleted;
};

export const getAdditionalStageISCompleted = (state) => {
  return state.order.additionalStageISCompleted;
};

export const getFinalStageIsCompleted = (state) => {
  return state.order.finalStageIsCompleted;
};

export const getCurrentCarId = (state) => {
  if (state.order.currentCar) {
    return state.order.currentCar.id;
  }
    return null;
};

export const getCurrentCarName = (state) => {
  if (state.order.currentCar) {
    return state.order.currentCar.name;
  }
    return null;
};

export const getCurrentCategory = (state) => {
  return state.order.currentCategory;
};