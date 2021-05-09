export const getCurrentColor = (state) => {
  return state.details.color;
};

export const getFromDate = (state) => {
  return state.details.from;
};

export const getToDate = (state) => {
  return state.details.to;
};

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