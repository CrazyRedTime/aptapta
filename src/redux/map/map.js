import {
  FETCH_POINTS_START,
  FETCH_POINTS_SUCCESS,
  FETCH_MARKERS,
  SET_CENTER,
  SET_ZOOM
} from "./actionTypes";

const initialState = {
  isFetching: false,
  points: [],
  markers: [],
  center: { lat: 54.3186575, lng: 48.397776 },
  zoom: 12
};

const map = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POINTS_START:
      return {
        ...state,
        isFetching: true,
      }

    case FETCH_POINTS_SUCCESS:
      return {
        ...state,
        points: [...payload],
      };

    case FETCH_MARKERS:
      return {
        ...state,
        isFetching: false,
        markers: [...payload],
      };

      case SET_CENTER:
        return {
          ...state,
          center: payload
        }

    case SET_ZOOM:
      return {
        ...state,
        zoom: payload
      }

    default:
      return state;
  }
};

export default map;
