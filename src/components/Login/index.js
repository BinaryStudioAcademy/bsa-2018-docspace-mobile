import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';



class Login extends Component {
  render () {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/logoAnimalwhite.png')}
          />
          <Text style={styles.appName}>DOCSPACE</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#0044a9'
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
  }
})

const mapStateToProps = state => ({
  login: state.login
})

export default connect(mapStateToProps, null)(Login)