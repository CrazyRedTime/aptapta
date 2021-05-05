import { createSelector } from "reselect";
import uniqBy from "lodash.uniqby";

const getPointsFromState = (state) => state.map.points;

export const getPointsAddress = createSelector(
  [getPointsFromState],
  (points) => {
    return points;
  }
);

const getMarkersFromState = (state) => {
  return state.map.markers;
};

export const getMarkersWithMemo = createSelector(
  [getMarkersFromState],
  (markers) => {
    return markers;
  }
);

export const getCitiesWithMemo = createSelector(
  [getMarkersFromState],
  (markers) => {
    return uniqBy(
      markers.map((marker) => marker.city),
      "id"
    );
  }
);

export const getCenter = (state) => {
  return state.map.center;
};

export const getCenterWithMemo = createSelector([getCenter], (center) => {
  return center;
});

export const getZoom = (state) => {
  return state.map.zoom;
};
