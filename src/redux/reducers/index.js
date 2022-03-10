import { combineReducers } from 'redux';
import player from './playerReducer';
import token from './tokenReducer';

const rootReducer = combineReducers({ player, token });

export default rootReducer;
