import { SET_REFS, SET_TOUR_STEPS } from "../action/tour.action";

const initialState = {
  ref1: null,
  ref2: null,
  ref3: null,
  tourSteps: [],
};

export const refReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REFS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_TOUR_STEPS:
      return {
        ...state,
        tourSteps: action.payload,
      };
    default:
      return state;
  }
};

