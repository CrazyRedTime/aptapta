import api from "../api/api";
import {
  FETCH_POINTS_START,
  FETCH_POINTS_SUCCESS,
  FETCH_POINTS_FAILURE,
  FETCH_MARKERS,
} from "./actionTypes";

const initialState = {
  points: [],
  markers: [],
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

export default map;
