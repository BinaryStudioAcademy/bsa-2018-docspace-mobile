import { createStackNavigator } from 'react-navigation';
import { store, sagaMiddleware } from './src/commonLogic/store'
import rootSaga from './src/commonLogic/rootSaga';
import React, { Component } from 'react'
// import routeConfig from './src/routerConfig'
import Login from './src/components/Login';
import { Provider } from 'react-redux'


sagaMiddleware.run(rootSaga);

const Main = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}