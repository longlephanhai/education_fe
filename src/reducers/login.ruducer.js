export const login = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      const { data } = action;
      return data||true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
} 