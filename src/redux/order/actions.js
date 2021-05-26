import {
  COMPLETE_MAP_STAGE,
  COMPLETE_CAR_STAGE,
  COMPLETE_ADDITIONAL_STAGE,
  UNCOMPLETE_ADDITIONAL_STAGE,
  SET_CURRENT_ADDRESS,
  SET_CURRENT_CITY,
  SET_CURRENT_CAR,
  SET_CURRENT_CATEGORY,
  SET_CURRENT_PRICE,
  FETCH_ORDER_STATUS_ID_START,
  FETCH_ORDER_STATUS_ID_SUCCESS,
  FETCH_ORDER_STATUS_ID_FAILURE,
} from "./actionTypes";
import api from "../../api/api";

export const setCurrentCity = (city) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_CITY,
    payload: city,
  });
};

export const setCurrentAddress = (address) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_ADDRESS,
    payload: address,
  });
};

export const setCurrentCar = (car) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_CAR,
    payload: car,
  });
};

export const setCurrentCategory = (category) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_CATEGORY,
    payload: category,
  });
};

export const setCurrentPrice = (price) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PRICE,
    payload: price,
  });
};

export const completeMapStage = () => (dispatch) => {
  dispatch({
    type: COMPLETE_MAP_STAGE,
  });
};

export const completeCarStage = () => (dispatch) => {
  dispatch({
    type: COMPLETE_CAR_STAGE,
  });
};

export const completeAdditionalStage = () => (dispatch) => {
  dispatch({
    type: COMPLETE_ADDITIONAL_STAGE,
  });
};

export const uncompleteAdditionalStage = () => (dispatch) => {
  dispatch({
    type: UNCOMPLETE_ADDITIONAL_STAGE,
  });
};

export const fetchOrderStatusId = (id) => async (dispatch) => {
  dispatch({
    type: FETCH_ORDER_STATUS_ID_START,
  });
  try {
    const id = await api.getOrderStatusIdFromApi();
    dispatch({
      type: FETCH_ORDER_STATUS_ID_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_STATUS_ID_FAILURE,
      payload: error,
      error: true,
    });
  }
};