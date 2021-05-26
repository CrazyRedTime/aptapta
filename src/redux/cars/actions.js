import api from '../../api/api'
import { FETCH_CARS_FAILURE, FETCH_CARS_START, FETCH_CARS_SUCCESS } from "./actionTypes";

export const fetchCars = () => async(dispatch) => {
  dispatch({
    type: FETCH_CARS_START
  })
  try {
    const cars = await api.getCarsFromApi();
    dispatch({
      type: FETCH_CARS_SUCCESS,
      payload: cars
    })
  } catch (error) {
    dispatch({
      type: FETCH_CARS_FAILURE,
      payload: error,
      error: true,
    });
  }
}