import { call, take, put } from 'redux-saga/effects';
import request from '../request';
import { normalizeItems } from '../utils';
import {
  loadPublicGistsOfUserSuccess,
  loadPublicGistsOfUserError,
} from '../actions/action-creator';
import {
  BASE_URL,
  ACTION_LOAD_PUBLIC_GISTS,
} from '../actions/action-constants';

/**
 * Makes GET request
 * @returns {*}
 */

export function* loadPublicGistsOfUser(action) {
  try {
    const URL_LOAD_PUBLIC_GISTS = `${BASE_URL}/users/${action.userName}/gists`;
    const response = yield call(request, URL_LOAD_PUBLIC_GISTS, { method: 'GET' });

    if (response && response.length === 0) {
      yield put(loadPublicGistsOfUserError('No Gists Found'));
      yield put(loadPublicGistsOfUserSuccess());
    } else yield put(loadPublicGistsOfUserSuccess(normalizeItems(response, 'id'), response[0].owner));
  } catch (error) {
    if (error === 'Not Found') error = 'Username not found';
    yield put(loadPublicGistsOfUserError(error));
    yield put(loadPublicGistsOfUserSuccess());
  }
}

/**
 * Manages watcher lifecycle
 */

export default function* loadPublicGistsOfUserSaga() {
  while (true) {
    const action = yield take(ACTION_LOAD_PUBLIC_GISTS);
    yield call(loadPublicGistsOfUser, action);
  }
}
