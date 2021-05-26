import { FETCH_CARS_START, FETCH_CARS_SUCCESS } from "./actionTypes";

const initialState = {
  isFetching: false,
  cars: [],
};

const cars = (state = initialState, {type, payload}) => {
  switch (type) {

    case FETCH_CARS_START:
      return {
        ...state,
        isFetching: true,
      }

    case FETCH_CARS_SUCCESS:
      return {
        ...state,
        cars: [...payload],
        isFetching: false,
      };
  
    default:
      return state;
  }
};

export default cars;