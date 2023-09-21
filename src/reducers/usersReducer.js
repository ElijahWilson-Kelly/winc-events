const addUser = (previousState, userDetails) => {
  return [...previousState, userDetails];
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "populate":
      return action.payload;
    case "user_added":
      return addUser(state, action.payload);
  }
  return state;
};
