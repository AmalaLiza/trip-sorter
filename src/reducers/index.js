import { combineReducers } from 'redux';
import dealsReducer from './dealsReducer';

export default function createReducer(asyncReducers) {
  const appReducer = combineReducers({
    deals: dealsReducer,
    // write synchronous reducers above this line
    ...asyncReducers,
  });

  return (state, action) => appReducer(state, action);
}
