import { createStore, applyMiddleware, compose  } from 'redux'
import {createLogger} from 'redux-logger'
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import devTools from 'remote-redux-devtools';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        sagaMiddleware,
        logger,
      ),
      devTools(),
    ),
  );

export { store, sagaMiddleware }
