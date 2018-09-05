import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Button } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loginRequest from '../logic/loginActions'

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  handleInput = (value, field) => {
    this.setState({[field]: value})
  }

  handleLogin = () => {
    console.log('LOGIN PRESSED')
    const {email, password} = this.state
    console.log(email, password)
    this.props.login(email, password)
  }

  isLoginAllowed = () => this.state.email.length > 5 && this.state.password.length >= 6
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
        />
        <TextInput
         style={styles.input}
         placeholder='Email'
         returnKeyType='next'
         underlineColorAndroid='rgba(0,0,0,0)'
         keyboardType='email-address'
         autoCapitalize='none'
         autoCorrect={false}
         onSubmitEditing={() => this.passwordInput.focus()}
         onChangeText={(text) => this.handleInput(text, 'email')}
         />
        <TextInput
         style={styles.input}
         placeholder='Password'
         underlineColorAndroid='rgba(0,0,0,0)'
         returnKeyType='go'
         secureTextEntry
         ref={(input) => this.passwordInput = input}
         onChangeText={(text) => this.handleInput(text, 'password')}
        />

        <TouchableOpacity >
          <Button
          title='LOGIN'
          color='#841584'
          onPress={this.handleLogin}
          disabled={!this.isLoginAllowed()}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(loginRequest, dispatch)
})


const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: '#f4f5f7',
    marginBottom: 20,
    paddingHorizontal: 20
  }
})

export default connect(null, mapDispatchToProps)(LoginForm)