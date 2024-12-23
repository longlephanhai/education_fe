export const role = (state = false, action) => {
  switch (action.type) {
    case "ROLE":
      return action.data;
    default:
      return state;
  }
} 