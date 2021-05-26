import api from "../../api/api";
import {
  FETCH_RATES_FAILURE,
  FETCH_RATES_START,
  FETCH_RATES_SUCCESS,
} from "./actionTypes";

export const fetchRates = () => async (dispatch) => {
  dispatch({
    type: FETCH_RATES_START,
  });
  try {
    const rates = await api.getRatesFromApi();
    dispatch({
      type: FETCH_RATES_SUCCESS,
      payload: rates,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RATES_FAILURE,
      payload: error,
      error: true,
    });
  }
};