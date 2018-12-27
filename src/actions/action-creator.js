import {
  ACTION_CLEAR_GISTS,
  ACTION_HIDE_ERROR,
  ACTION_SET_FILTERS,
  ACTION_LOAD_DEALS,
  ACTION_LOAD_DEALS_ERROR,
  ACTION_LOAD_DEALS_SUCCESS,
  ACTION_SHOW_ERROR,
} from './action-constants';

export const setFilters = (to, from) => ({
  type: ACTION_SET_FILTERS,
  payload: {
    to, from,
  },
});

export const loadDeals = userName => ({
  type: ACTION_LOAD_DEALS,
  userName,
});

export const loadDealsSuccess = (deals = {}) => ({
  type: ACTION_LOAD_DEALS_SUCCESS,
  payload: {
    deals,
  },
});

export const loadDealsError = error => ({
  type: ACTION_LOAD_DEALS_ERROR,
  error,
});

export const showError = error => ({
  type: ACTION_SHOW_ERROR,
  payload: error,
});

export const hideError = () => ({
  type: ACTION_HIDE_ERROR,
});

export const clearSearch = () => ({
  type: ACTION_CLEAR_GISTS,
});
