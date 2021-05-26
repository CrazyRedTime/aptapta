import { createSelector } from "reselect";

const getCarsFromState = (state) => {
  return state.cars.cars;
};

export const getCarsWithMemo = createSelector(
  [getCarsFromState],
  (cars) => cars
);

const getCategoriesFromState = (state) => {

  return state.cars.cars.reduce((acc, car) => {
    if (!acc.some((category) => category.id === car.categoryId.id)) {
      acc.push({
        id: car.categoryId.id,
        name: car.categoryId.name
      })
    }
    return acc
  }, [])
};

export const getCategoriesWithMemo = createSelector(
  [getCategoriesFromState],
  (categories) => categories
);

export const getCurrentCarColors = (state) => {
  return state.order.currentCar.colors
};

export const getCarsIsFetching = (state) => {
  return state.cars.isFetching;
};
