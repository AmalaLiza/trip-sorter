import { call, fork, take, put } from 'redux-saga/effects';
import request from '../request';
import {
  loadForksSuccess,
  loadForksError,
} from '../actions/action-creator';
import { ACTION_LOAD_FORKS } from '../actions/action-constants';

/**
 * Makes GET request
 * @returns {*}
 */

export function* loadForks(action) {
  try {
    const URL_LOAD_FORKS = action.payload.url;
    const response = yield call(request, URL_LOAD_FORKS, { method: 'GET' });
    if (response && response.length === 0) {
      console.info(`No Forks Found for ${action.payload.url}`);
    } else {
      response.gistId = action.payload.id;
      yield put(loadForksSuccess(response));
    }
  } catch (error) {
    yield put(loadForksError(error));
  }
}

/**
 * Manages watcher lifecycle
 */

export default function* loadForksSaga() {
  while (true) {
    const action = yield take(ACTION_LOAD_FORKS);
    yield fork(loadForks, action);
  }
}
