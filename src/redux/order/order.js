import {
  COMPLETE_MAP_STAGE,
  COMPLETE_CAR_STAGE,
  COMPLETE_ADDITIONAL_STAGE,
  SET_CURRENT_ADDRESS,
  SET_CURRENT_CITY,
  SET_CURRENT_CAR,
  SET_CURRENT_CATEGORY,
} from "./actionTypes";

const initialState = {
  currentAddress: null,
  currentCity: null,
  currentCar: null,
  currentCategory: "",
  mapStageIsCompleted: false,
  carStageIsCompleted: false,
  additionalStageIsCompleted: false,
  finalStageIsCompleted: false,
};

const order = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_CITY:
      return {
        ...state,
        currentCity: payload,
      };

    case SET_CURRENT_ADDRESS:
      return {
        ...state,
        currentAddress: payload,
        mapStageIsCompleted: false,
        carStageIsCompleted: false,
        currentCategory: "",
      };

    case SET_CURRENT_CAR:
      return {
        ...state,
        currentCar: payload,
        carStageIsCompleted: false,
      };

    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: payload,
      };

    case COMPLETE_MAP_STAGE:
      return {
        ...state,
        mapStageIsCompleted: true,
      };

    case COMPLETE_CAR_STAGE:
      return {
        ...state,
        carStageIsCompleted: true,
      };

    case COMPLETE_ADDITIONAL_STAGE:
      return {
        ...state,
        additionalStageIsCompleted: true
      }

    default:
      return state;
  }
};

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

export default order;
