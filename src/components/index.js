
import React, {Component} from 'react';
import {StatusBarIOS, Text, View, StyleSheet, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Login from './Login';
import Home from './Home';
import SpacesList from './SpacesList'
import Profile from './Profile'




class Docspace extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Login />;
    }

    return (
      <Router>
        <Stack key="root" titleStyle={{ alignSelf: 'center' }} >
          <Scene key="Home" hideTabBar component={Home} initial />
          <Scene key="spaces" component={SpacesList} />
          {/* <Scene key="myspaces" component={MySpaces} /> */}
          <Scene key="profile" component={Profile} />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = function(state) {
  return {
    isAuthenticated: state.login.successful,
  }
};

export default connect(mapStateToProps)(Docspace);