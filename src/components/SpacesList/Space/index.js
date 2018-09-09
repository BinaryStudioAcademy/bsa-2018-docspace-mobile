import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PagesList from '../../PagesList'
import { getSpaceRequest } from '../../SpacesList/logic/spacesActions'


class Space extends Component {
  componentDidMount () {
    this.props.getSpaceById(this.props.spaceId)
  }
  render () {
    const {name, pages} = this.props.space
    const {isFetching} = this.props
    console.log('in space', name, 'pages---', pages, 'fetching', isFetching)
    return isFetching
      ? <View style={styles.fetching}>
          <ActivityIndicator size='large' color='#0044a9' />
        </View>
      :  (<View >
            <View>
              <Text>{name}</Text>
            </View>
            <View>
              <PagesList pages={pages}/>
            </View>
          </View>
    )
  }
}

const styles = StyleSheet.create({
  fetching: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const mapStateToPops = (state, props) => ({
  space: state.spaces.byId[props.spaceId],
  isFetching: state.spaces.isFetching
})

const mapDispatchToProps = dispatch => ({
  getSpaceById: bindActionCreators(getSpaceRequest, dispatch)
})

export default connect(mapStateToPops, mapDispatchToProps)(Space)