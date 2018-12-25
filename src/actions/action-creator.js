import {
    ACTION_CLEAR_GISTS,
    ACTION_HIDE_ERROR,
    ACTION_LOAD_DEALS,
    ACTION_LOAD_DEALS_ERROR,
    ACTION_LOAD_DEALS_SUCCESS,
} from './action-constants';

export const loadDeals = (userName) => ({
    type: ACTION_LOAD_DEALS,
    userName,
});

export function loadDealsSuccess(deals = {}) {
    return {
        type: ACTION_LOAD_DEALS_SUCCESS,
        payload: {
            deals,
        },
    };
}

export function loadDealsError(error) {
    return {
        type: ACTION_LOAD_DEALS_ERROR,
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
