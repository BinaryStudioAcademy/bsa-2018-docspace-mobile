import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';



class Login extends Component {
  render () {
    return this.props.isFetching
    ? <View style={styles.fetching}>
       <ActivityIndicator size='large' color='#344f7c' />
      </View>
    : <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/logoAnimalwhite.png')}
          />
          <Text style={styles.appName}>DOCSPACE</Text>
        </View>
        <View>
          <LoginForm/>
        </View>
      </KeyboardAvoidingView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#344f7c'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  appName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 10
  },
  logo: {
    marginTop: 10,
    width: 80,
    height: 80
  },
  fetching: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const mapStateToProps = state => ({
  login: state.login,
  isFetching: state.login.requesting
})

export default connect(mapStateToProps)(Login)