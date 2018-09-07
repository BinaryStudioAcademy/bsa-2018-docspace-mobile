import React, { Component } from 'react';
import { StyleSheet, View, Button ,Text, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Home extends Component {

  render () {
    return (
      <View {...this.props}>
        <Button title="All spaces" onPress={Actions.spaces} />
        <Button title="My spaces" onPress={Actions.myspaces} />
        <Button title="Profile" onPress={Actions.profile} />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})


export default Home