const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_LOGIN:
    state = {
      ...state,
      player: {
        name: action.payload.name,
        gravatarEmail: action.payload.gravatarEmail,
      },
    };
    return state;
  case CHANGE_SCORE:
    state = {
      ...state,
      player: {
        score: action.payload.score,
        assertions: action.payload.assertions,
      },
    };
    return state;
  default:
    return state;
  }
};

export default playerReducer;
