import { fromJS } from 'immutable';
import {
    ACTION_CLEAR_GISTS,
    ACTION_HIDE_ERROR,
    ACTION_LOAD_DEALS_ERROR,
    ACTION_LOAD_DEALS_SUCCESS,
    ACTION_SET_FILTERS, ACTION_SHOW_ERROR,
} from '../actions/action-constants';
import { normalizeItems } from '../utils';

const initialState = fromJS({
  user: {},
  deals: {},
  filteredDeals: {},
  error: '',
});

export default function dealsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOAD_DEALS_SUCCESS: {
      const data = action.payload.deals.reduce((acc, prev) => {
        if (acc.arrival.indexOf(prev.arrival) === -1) {
          acc.arrival.push(prev.arrival);
        }
        if (acc.departure.indexOf(prev.departure) === -1) {
          acc.departure.push(prev.departure);
        }
        return acc;
      }, { arrival: [], departure: [] });
      let newState = state.set('arrival', data.arrival);
      newState = newState.set('departure', data.departure);
      return newState.set('deals', fromJS(normalizeItems(action.payload.deals, 'reference')));
    }

    case ACTION_SET_FILTERS: {
      let newState = state.set('to', action.payload.to);
      newState = newState.set('from', action.payload.from);
      return newState.update('filteredDeals', () => state.get('deals').filter(deal => deal.get('arrival') === action.payload.to && deal.get('departure') === action.payload.from));
    }

    case ACTION_SHOW_ERROR:
      return state.update('error', () => fromJS(action.payload));

    case ACTION_HIDE_ERROR:
      return state.update('error', () => '');

    case ACTION_CLEAR_GISTS:
      return state.update('filteredDeals', () => fromJS({}));

    default:
      return state;
  }
}
