const initialState = {
  tourOpen: false
};

export const tourReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_TOUR":
      return {
        ...state,
        tourOpen: action.data
      };
    default:
      return state;
  }
};

