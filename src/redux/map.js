import api from "../api/api";
import {
  FETCH_POINTS_START,
  FETCH_POINTS_SUCCESS,
  FETCH_POINTS_FAILURE,
  FETCH_MARKERS,
  FETCH_CITIES,
} from "./actionTypes";

const initialState = {
  points: [],
  markers: [],
  cities: [],
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

    case FETCH_CITIES:
      return {
        ...state,
        cities: payload
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

export const fetchCities = (cities) => async (dispatch) => {
  const citiesWithCoordinates = await Promise.all(
    cities.map((city) => {
      return api.getCityForMap(city);
    })
  );
  dispatch({
    type: FETCH_CITIES,
    payload: citiesWithCoordinates,
  });
};

export default map;
