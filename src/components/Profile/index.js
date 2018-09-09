import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';


class Profile extends Component {
  render () {
    const {firstName, lastName, avatar} = this.props.user
    return (
      <View style={styles.profileAvatar}>
        <Avatar
          large
          source={{uri: `${avatar}`}}
          activeOpacity={0.7}
          rounded
        />
        <Text>{`${firstName} ${lastName}`}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileAvatar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  }
})


export default Profile