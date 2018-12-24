import {
  ACTION_LOAD_PUBLIC_GISTS,
  ACTION_LOAD_PUBLIC_GISTS_SUCCESS,
  ACTION_LOAD_PUBLIC_GISTS_ERROR,
  ACTION_LOAD_FORKS,
  ACTION_LOAD_FORKS_SUCCESS,
  ACTION_LOAD_FORKS_ERROR,
  ACTION_HIDE_ERROR,
  ACTION_CLEAR_GISTS,
} from './action-constants';

export function loadPublicGistsOfUser(userName) {
  return {
    type: ACTION_LOAD_PUBLIC_GISTS,
    userName,
  };
}

export function loadPublicGistsOfUserSuccess(gists = {}, user = {}) {
  return {
    type: ACTION_LOAD_PUBLIC_GISTS_SUCCESS,
    payload: {
      gists,
      user,
    },
  };
}

export function loadPublicGistsOfUserError(error) {
  return {
    type: ACTION_LOAD_PUBLIC_GISTS_ERROR,
    error,
  };
}

export function loadAllForks(url, id) {
  return {
    type: ACTION_LOAD_FORKS,
    payload: { url, id },
  };
}

export function loadForksSuccess(payload) {
  return {
    type: ACTION_LOAD_FORKS_SUCCESS,
    payload,
  };
}

export function loadForksError(error) {
  return {
    type: ACTION_LOAD_FORKS_ERROR,
    error,
  };
}

export function hideError() {
  return {
    type: ACTION_HIDE_ERROR,
  };
}

export function clearGists() {
  return {
    type: ACTION_CLEAR_GISTS,
  };
}
