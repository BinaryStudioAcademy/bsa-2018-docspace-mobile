import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllSpacesRequest } from './logic/spacesActions';
import { allSpaces } from './logic/spacesReducer';
import { List, ListItem } from 'react-native-elements'

class SpacesList extends Component {
  componentDidMount () {
    this.props.getAllSpaces()
  }
  render () {
    return (
      <List containerStyle={{marginBottom: 20}}>
        {this.props.allSpaces.map(space => (
           <ListItem
              key={space._id}
              title={space.name}
              // onPress={Actions.space}
           />
          ))
        }
      </List>
    )
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => ({
  allSpaces: allSpaces(state)
})

const mapDispatchToProps = dispatch => ({
  getAllSpaces: bindActionCreators(getAllSpacesRequest, dispatch)
})


export default connect(mapStateToProps,mapDispatchToProps)(SpacesList)
// export default SpacesList