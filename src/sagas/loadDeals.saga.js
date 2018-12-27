import { call, put, take } from 'redux-saga/effects';
import { loadDealsError, loadDealsSuccess } from '../actions/action-creator';
import { ACTION_LOAD_DEALS } from '../actions/action-constants';
import JSON_DATA from './response.json';

/**
 * Makes GET request
 * @returns {*}
 */

export function* loadDeals() {
  try {
    // Service call URL should be given here.
    // const response = yield call(request, URL, { method: 'GET' });
    const response = JSON_DATA;

    if (response && response.deals.length !== 0) {
      yield put(loadDealsSuccess(response.deals));
    }
  } catch (error) {
    yield put(loadDealsError(error));
  }
}

/**
 * Manages watcher lifecycle
 */

export default function* loadDealsSaga() {
  while (true) {
    const action = yield take(ACTION_LOAD_DEALS);
    yield call(loadDeals, action);
  }
}
