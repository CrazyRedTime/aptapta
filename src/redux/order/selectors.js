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
  return state.order.additionalStageIsCompleted;
};

export const getFinalStageIsCompleted = (state) => {
  return state.order.finalStageIsCompleted;
};

const getCurrentCarFromState = (state) => {
  return state.order.currentCar;
};

export const getCurrentCarWithMemo = createSelector(
  getCurrentCarFromState,
  (car) => car
);

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

export const getCurrentCarNumber = (state) => {
  if (state.order.currentCar) {
    return state.order.currentCar.number;
  }
  return null;
};

export const getCurrentCarImageLink = (state) => {
  if (state.order.currentCar) {
    return state.order.currentCar.thumbnail.path;
  }
  return null;
};

export const getCurrentCategory = (state) => {
  return state.order.currentCategory;
};

export const getCurrentCarPrices = (state) => {
  if (state.order.currentCar) {
    const minPrice = state.order.currentCar.priceMin;
    const maxPrice = state.order.currentCar.priceMax;
    return `от ${minPrice} до ${maxPrice} ₽`;
  }
  return null;
};

export const getCurrentPrice = (state) => {
  return state.order.currentPrice;
};

const getOrderStatusIdFromState = (state) => {
  return state.order.orderStatusId;
};

export const getOrderStatusIdWithMemo = createSelector(
  [getOrderStatusIdFromState],
  (orderStatusId) => orderStatusId
);

export const getOrder = createSelector(
  getCurrentAddressWithMemo,
  getCurrentCarName,
  getCurrentCarPrices,
  getCurrentPrice,
  getOrderStatusIdWithMemo,
  (
    currentAddress,
    currentCarName,
    currentCarPrices,
    currentPrice,
    orderStatusId
  ) => {
    return {
      currentAddress,
      currentCarName,
      currentCarPrices,
      currentPrice,
      orderStatusId,
    };
  }
);

export const getOrderForPosting = createSelector(
  getOrderStatusIdWithMemo,
  getCurrentCityWithMemo,
  getCurrentAddressWithMemo,
  getCurrentCarWithMemo,
  getCurrentPrice,
  (orderStatusId, cityId, pointId, carId, price) => {
    return {
      orderStatusId,
      cityId,
      pointId,
      carId,
      price,
    };
  }
);
