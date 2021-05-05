import api from "../../api/api";
import {
  FETCH_POINTS_START,
  FETCH_POINTS_SUCCESS,
  FETCH_POINTS_FAILURE,
  FETCH_MARKERS,
  SET_CENTER,
  SET_ZOOM
} from "./actionTypes";

const initialState = {
  points: [],
  markers: [],
  center: { lat: 54.3186575, lng: 48.397776 },
  zoom: 12
};

const map = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POINTS_SUCCESS:
      return {
        ...state,
        points: [...payload],
      };

    case FETCH_MARKERS:
      return {
        ...state,
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

export const fetchPoints = () => async (dispatch) => {
  dispatch({
    type: FETCH_POINTS_START,
  });
  try {
    const markers = await api.getPointsFromApi();
    dispatch({
      type: FETCH_POINTS_SUCCESS,
      payload: markers,
    });
  } catch (error) {
    dispatch({
      type: FETCH_POINTS_FAILURE,
      payload: error,
      error: true,
    });
  }
};

export const fetchMarkers = (points) => async (dispatch) => {
  const markers = await Promise.all(
    points.map((point) => {
      return api.getMarkerForMap(point);
    })
  );
  dispatch({
    type: FETCH_MARKERS,
    payload: markers,
  });
};

export const setCenter = (center) => (dispatch) => {
  dispatch({
    type: SET_CENTER,
    payload: center
  })
}

export const setZoom = (zoom) => (dispatch) => {
  dispatch({
    type: SET_ZOOM,
    payload: zoom
  })
}

export default map;
