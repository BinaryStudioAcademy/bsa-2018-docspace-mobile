
import React, {Component} from 'react';
import {StyleSheet, StatusBar, ActivityIndicator, View} from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import Login from './Login';
import Home from './Home';
import SpacesList from './SpacesList'
import Profile from './Profile'
import Space from './SpacesList/Space'
import PagesList from './PagesList'
import Page from './PagesList/Page'
import { bindActionCreators } from 'redux'
import { verificationRequest } from './Login/logic/loginActions'
import logo from '../images/logoAnimalwhite.png'
import { Icon } from 'react-native-elements'




class Docspace extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    this.props.verification()
  }

  renderRightButton = () => {
    return (
      <Icon
        onPress={() => Actions.home()}
        name='home'
        color='#fff'
        iconStyle={{ marginRight: 5}}
      />)
  }

  render() {
    const { isAuthenticated, isFetching } = this.props;
    if (isFetching) {
      return (<View style={styles.fetching}>
                <ActivityIndicator size='large' color='#0044a9' />
              </View>)
    } else if (!isAuthenticated) {
      return <Login />;
    }

    return (
      <Router SceneStyle={{flex: 1}}	>
        <Stack
          key="root"
          navigationBarStyle={styles.navbar}
          titleStyle={styles.titleStyle}
        >
          <Scene
            key="home"
            hideNavBar
            component={Home} initial
          />
          <Scene
            key="spaces"
            title='Spaces'
            renderRightButton={this.renderRightButton}
            component={SpacesList}
            backButtonTintColor='#fff'
          />
          <Scene
            key="space"
            title='Pages'
            component={Space}
            renderRightButton={this.renderRightButton}
            backButtonTintColor='#fff'
          />
          <Scene
            key="page"
            title='Page'
            component={Page}
            renderRightButton={this.renderRightButton}
            backButtonTintColor='#fff'
          />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  fetching: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    backgroundColor: '#344f7c',
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'normal',
  },
  leftButton: {
    color: '#fff',
  }
});

const mapStateToProps = function(state) {
  return {
    isAuthenticated: state.login.successful,
    isFetching: state.login.requesting
  }
};

const mapDispatchToProps = dispatch => ({
  verification: bindActionCreators(verificationRequest, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Docspace);