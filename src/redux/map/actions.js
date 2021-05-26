import api from "../../api/api";
import {
  FETCH_POINTS_START,
  FETCH_POINTS_SUCCESS,
  FETCH_POINTS_FAILURE,
  FETCH_MARKERS,
  SET_CENTER,
  SET_ZOOM
} from "./actionTypes";

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