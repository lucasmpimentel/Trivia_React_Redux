const INITIAL_STATE = { token: '' };

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default token;
