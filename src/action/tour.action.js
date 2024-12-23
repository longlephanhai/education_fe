export const SET_REFS = 'SET_REFS';
export const SET_TOUR_STEPS = 'SET_TOUR_STEPS';
export const setRefs = (refs) => ({
  type: SET_REFS,
  payload: refs,
});

export const setTourSteps = (steps) => ({
  type: SET_TOUR_STEPS,
  payload: steps,
});