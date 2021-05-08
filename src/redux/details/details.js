import { CLEAR_DETAILS, SET_COLOR, SET_FROM, SET_TO } from "./actionTypes";

const initialState = {
  color: "",
  from: null,
  to: null,
  tariff: '',
  options: {
    fulltank: false,
    babySeat: false,
    rightHandDrive: false
  }
};

const details = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_COLOR:
      return {
        ...state,
        color: payload,
      };

    case SET_FROM:
      return {
        ...state,
        from: payload
      };

    case SET_TO:
      return {
        ...state,
        to: payload
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
    payload: color
  })
};

export const setFrom = (from) => (dispatch) => {
  dispatch({
    type: SET_FROM,
    payload: from
  })
};

export const setTo = (to) => (dispatch) => {
  dispatch({
    type: SET_TO,
    payload: to
  })
};

export const clearDetails = () => (dispatch) => {
  dispatch({
    type: CLEAR_DETAILS
  })
}

export default details;
