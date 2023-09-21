export const reducer = (state, action) => {
  switch (action.type) {
    case "populate":
      return action.payload;
  }
  return state;
};
