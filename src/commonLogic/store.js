import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()


const store = createStore(rootReducer,
  applyMiddleware( sagaMiddleware))

export { store, sagaMiddleware }
