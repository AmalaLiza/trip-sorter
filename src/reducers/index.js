import { combineReducers } from 'redux';
import gistsReducer from './gistsReducer';

export default function createReducer(asyncReducers) {
  const appReducer = combineReducers({
    gistsApi: gistsReducer,
    // write synchronous reducers above this line
    ...asyncReducers,
  });

  return (state, action) => appReducer(state, action);
}
