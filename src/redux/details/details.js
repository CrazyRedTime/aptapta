import {
  CLEAR_DETAILS,
  SET_COLOR,
  SET_FROM,
  SET_TO,
  SET_RATE,
  SET_FULLTANK,
  SET_BABY_SEAT,
  SET_RIGHT_HAND_DRIVE,
} from "./actionTypes";

const initialState = {
  color: null,
  from: null,
  to: null,
  rate: '',
  options: {
    fulltank: false,
    babySeat: false,
    rightHandDrive: false,
  },
};

const details = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COLOR:
      return {
        ...state,
        color: payload,
      };

    case SET_FROM:
      return {
        ...state,
        from: payload,
      };

    case SET_TO:
      return {
        ...state,
        to: payload,
      };

    case SET_RATE:
      return {
        ...state,
        rate: payload,
      };

    case SET_FULLTANK:
      return {
        ...state,
        options: {
          ...state.options,
          fulltank: payload,
        },
      };

    case SET_BABY_SEAT:
      return {
        ...state,
        options: {
          ...state.options,
          babySeat: payload,
        },
      };

    case SET_RIGHT_HAND_DRIVE:
      return {
        ...state,
        options: {
          ...state.options,
          rightHandDrive: payload,
        },
      };

    case CLEAR_DETAILS:
      return initialState;

    default:
      return state;
  }
};

export const setColor = (color) => (dispatch) => {
  dispatch({
    type: SET_COLOR,
    payload: color,
  });
};

export const setFrom = (from) => (dispatch) => {
  dispatch({
    type: SET_FROM,
    payload: from,
  });
};

export const setTo = (to) => (dispatch) => {
  dispatch({
    type: SET_TO,
    payload: to,
  });
};

export const clearDetails = () => (dispatch) => {
  dispatch({
    type: CLEAR_DETAILS,
  });
};

export const setRate = (rate) => (dispatch) => {
  dispatch({
    type: SET_RATE,
    payload: rate,
  });
};

export const setFulltank = (boolean) => (dispatch) => {
  dispatch({
    type: SET_FULLTANK,
    payload: boolean,
  });
};

export const setBabySeat = (boolean) => (dispatch) => {
  dispatch({
    type: SET_BABY_SEAT,
    payload: boolean,
  });
};

export const setRightHandDrive = (boolean) => (dispatch) => {
  dispatch({
    type: SET_RIGHT_HAND_DRIVE,
    payload: boolean,
  });
};

export default details;
