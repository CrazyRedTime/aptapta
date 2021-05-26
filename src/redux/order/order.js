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
  FETCH_ORDER_STATUS_ID_SUCCESS,
} from "./actionTypes";

const initialState = {
  currentAddress: null,
  currentCity: null,
  currentCar: null,
  currentCategory: "",
  currentPrice: null,
  mapStageIsCompleted: false,
  carStageIsCompleted: false,
  additionalStageIsCompleted: false,
  finalStageIsCompleted: false,
  orderStatusId: null,
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

    case SET_CURRENT_PRICE:
      return {
        ...state,
        currentPrice: payload,
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
        additionalStageIsCompleted: true,
      };

    case UNCOMPLETE_ADDITIONAL_STAGE:
      return {
        ...state,
        additionalStageIsCompleted: false,
      };

    case FETCH_ORDER_STATUS_ID_SUCCESS:
      return {
        ...state,
        orderStatusId: payload,
      };

    default:
      return state;
  }
};

export default order;
