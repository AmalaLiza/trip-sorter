import {fromJS} from 'immutable';
import {
    ACTION_CLEAR_GISTS,
    ACTION_HIDE_ERROR,
    ACTION_LOAD_DEALS_ERROR,
    ACTION_LOAD_DEALS_SUCCESS,
    ACTION_SET_FILTERS,
} from '../actions/action-constants';
import {normalizeItems} from "../utils";

const initialState = fromJS({
    user: {},
    deals: {},
    filteredDeals: {
        TBP0345: {
            transport: 'train',
            departure: 'Budapest',
            arrival: 'Prague',
            duration: {
                h: '03',
                m: '45'
            },
            cost: 160,
            discount: 0,
            reference: 'TBP0345'
        },
        CBP0530: {
            transport: 'car',
            departure: 'Budapest',
            arrival: 'Prague',
            duration: {
                h: '05',
                m: '30'
            },
            cost: 120,
            discount: 0,
            reference: 'CBP0530'
        },
        BBP0615: {
            transport: 'bus',
            departure: 'Budapest',
            arrival: 'Prague',
            duration: {
                h: '06',
                m: '15'
            },
            cost: 40,
            discount: 0,
            reference: 'BBP0615'
        }
    },
    error: '',
});

export default function dealsReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_LOAD_DEALS_SUCCESS: {
            const accu = action.payload.deals.reduce((acc, prev) => {
                if (acc.arrival.indexOf(prev.arrival) === -1) {
                    acc.arrival.push(prev.arrival);
                }
                if (acc.departure.indexOf(prev.departure) === -1) {
                    acc.departure.push(prev.departure);
                }
                return acc;
            }, {arrival: [], departure: []});
            console.log(accu);
            state = state.set('arrival', accu.arrival);
            state = state.set('departure', accu.departure);
            return state.set('deals', fromJS(normalizeItems(action.payload.deals, 'reference')));
        }

        case ACTION_SET_FILTERS: {
            state = state.set('to', action.payload.to);
            state = state.set('from', action.payload.from);
            return state.update('filteredDeals', () => state.get('deals').filter((deal) => deal.get('arrival') === action.payload.to && deal.get('departure') === action.payload.from));
        }

        case ACTION_LOAD_DEALS_ERROR:
            return state.update('error', () => fromJS(action.error));

        case ACTION_HIDE_ERROR:
            return state.update('error', () => '');

        case ACTION_CLEAR_GISTS:
            return state.update('filteredDeals', () => fromJS({}));

        default:
            return state;
    }
}