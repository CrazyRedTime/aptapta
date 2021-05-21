import { createSelector } from "reselect";

export const getCurrentColor = (state) => {
  return state.details.color;
};

export const getFromDate = (state) => {
  return state.details.from;
};

const getFromDateMilliseconds = createSelector(
  getFromDate,
  fromDate => fromDate.getTime()
);

export const getToDate = (state) => {
  return state.details.to;
};

const getToDateMilliseconds = createSelector(
  getToDate,
  toDate => toDate.getTime()
)

export const getCurrentRate = (state) => {
  return state.details.rate;
};

export const getFullTank = (state) => {
  return state.details.options.fulltank;
};

export const getBabySeat = (state) => {
  return state.details.options.babySeat;
};

export const getRigthHandDrive = (state) => {
  return state.details.options.rightHandDrive;
};

export const getDetalsForPosting = createSelector(
  getCurrentColor,
  getFromDateMilliseconds,
  getToDateMilliseconds,
  getCurrentRate,
  getFullTank,
  getBabySeat,
  getRigthHandDrive,
  (
    color,
    dateFrom,
    dateTo,
    rateId,
    isFullTank,
    isNeedChildChair,
    isRightWheel
  ) => {
    return {
      color,
      dateFrom,
      dateTo,
      rateId,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
    };
  }
);
