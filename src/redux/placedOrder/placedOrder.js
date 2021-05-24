import {FETCH_PLACED_ORDER_START, FETCH_PLACED_ORDER_SUCCESS, FETCH_PLACED_ORDER_FAILURE, CLEAR_PLACED_ORDER} from './actionTypes';
import api from '../../api/api'

const initialState = {};

const placedOrder = (state = initialState, {type, payload}) => {
  switch (type) {

    case FETCH_PLACED_ORDER_SUCCESS:
      return {
        ...state,
        ...payload
      };
  
    case CLEAR_PLACED_ORDER:
      return initialState;

    default:
      return state;
  }
};

export const fetchPlacedOrder = (id) => async (dispatch) => {
  dispatch({
    type: FETCH_PLACED_ORDER_START
  })
  try {
    const placedOrder = await api.getOrderFromApi(id);
    dispatch({
      type: FETCH_PLACED_ORDER_SUCCESS,
      payload: placedOrder
    })
  } catch (error) {
    dispatch({
      type: FETCH_PLACED_ORDER_FAILURE,
      payload: error,
      error: true,
    });
  }
};

export const clearPlacedOrder = () => (dispatch) => {
  dispatch({
    type: CLEAR_PLACED_ORDER
  })
}

export default placedOrder;