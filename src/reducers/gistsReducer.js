import { fromJS } from 'immutable';
import {
  ACTION_CLEAR_GISTS,
  ACTION_HIDE_ERROR,
  ACTION_LOAD_FORKS_ERROR,
  ACTION_LOAD_FORKS_SUCCESS,
  ACTION_LOAD_PUBLIC_GISTS_ERROR,
  ACTION_LOAD_PUBLIC_GISTS_SUCCESS,
} from '../actions/action-constants';

const initialState = fromJS({
  user: {},
  publicGists: {},
  error: '',
});

export default function gistsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOAD_PUBLIC_GISTS_SUCCESS: {
      state = state.set('user', fromJS(action.payload.user));
      return state.set('publicGists', fromJS(action.payload.gists));
    }

    case ACTION_LOAD_FORKS_SUCCESS: {
      const sortedForks = action.payload
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      sortedForks.splice(3, sortedForks.length - 3);
      return state.updateIn(['publicGists', action.payload.gistId, 'forks'], () => fromJS(sortedForks));
    }

    case ACTION_LOAD_PUBLIC_GISTS_ERROR:
    case ACTION_LOAD_FORKS_ERROR:
      return state.update('error', () => fromJS(action.error));

    case ACTION_HIDE_ERROR:
      return state.update('error', () => '');

    case ACTION_CLEAR_GISTS:
      return state.update('publicGists', () => fromJS({}));

    default:
      return state;
  }
}
