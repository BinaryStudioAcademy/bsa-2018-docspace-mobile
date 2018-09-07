import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {store} from './src/commonLogic/store';
import Docspace from './src/components';
import {sagaMiddleware} from './src/commonLogic/store'
import rootSaga from './src/commonLogic/rootSaga';

sagaMiddleware.run(rootSaga);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Docspace />
      </Provider>
    );
  }
}