import Login from './components/Login'
import Home from './components/Home';

export default {
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
};