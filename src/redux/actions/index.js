export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const GET_TOKEN = 'GET_TOKEN';

export const player = (state) => ({
  type: 'PLAYER_LOGIN',
  payload: state,
});

export const changeScore = (score) => ({
  type: 'CHANGE_SCORE',
  payload: score,
});

export const token = (item) => ({
  type: 'GET_TOKEN',
  token: item,
});
