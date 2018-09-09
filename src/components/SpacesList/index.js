import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';


class SpacesList extends Component {
  render () {
    return (
      <ScrollView styles={styles.container}>
        {this.props.spaces.map(space => (
           <ListItem
              key={space._id}
              title={space.name}
              onPress={() => Actions.space({ spaceId: space._id})}
              leftIcon={{type: 'font-awesome', name: space.spaceSettings.icon, color: space.spaceSettings.color}}
           />
          ))
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  }
})

export default SpacesList