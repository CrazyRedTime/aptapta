import {
  FETCH_PLACED_ORDER_START,
  FETCH_PLACED_ORDER_SUCCESS,
  CLEAR_PLACED_ORDER,
} from "./actionTypes";

const initialState = {
  isFetching: false,
  order: {},
};

const placedOrder = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PLACED_ORDER_START:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_PLACED_ORDER_SUCCESS:
      return {
        ...state,
        order: { ...payload },
        isFetching: false,
      };

    case CLEAR_PLACED_ORDER:
      return initialState;

    default:
      return state;
  }
};

export default placedOrder;
