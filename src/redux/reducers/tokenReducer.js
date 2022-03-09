const INITIAL_STATE = { token: '' };

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    state = {
      ...state,
      token: action.payload.token,
    };
    return state;
  default:
    return state;
  }
};

export default tokenReducer;
