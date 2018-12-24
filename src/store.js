import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import createReducer from './reducers';
import sagas from './saga';

// Create middleware for sagas.
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // shouldHotReload: false
      deserializeState: state => Object.keys(state).reduce((previous, current) => {
        previous[current] = fromJS(state[current]);
        return previous;
      }, {}),
    }) : compose;

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  // Creating the redux-store from reducers and enhancers.
  const store = createStore(createReducer(), enhancer);

  // Run each saga
  sagas.forEach(saga => sagaMiddleware.run(saga));
  store.runSaga = sagaMiddleware.run;
  // Async reducer registry
  store.asyncReducers = {};
  return store;
}
