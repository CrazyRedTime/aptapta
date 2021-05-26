import {
  FETCH_RATES_START,
  FETCH_RATES_SUCCESS,
} from "./actionTypes";

const initialState = {
  isFetchig: false,
  rates: [],
};

const rates = (state = initialState, { type, payload }) => {
  switch (type) {

    case FETCH_RATES_START:
      return {
        ...state,
        isFetchig: true,
      }

    case FETCH_RATES_SUCCESS:
      return {
        ...state,
        isFetchig: false,
        rates: [...payload],
      }

    default:
      return state;
  }
};

export default rates;
