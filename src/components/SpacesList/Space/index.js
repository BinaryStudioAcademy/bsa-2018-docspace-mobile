import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator ,Image} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PagesList from '../../PagesList'
import { getSpaceRequest } from '../../SpacesList/logic/spacesActions'
import { Icon } from "react-native-elements";



class Space extends Component {
  componentDidMount () {
    this.props.getSpaceById(this.props.spaceId)
  }
  render () {
    const {name, pages, spaceSettings} = this.props.space
    const {isFetching} = this.props
    return isFetching
      ? <View style={styles.fetching}>
          <ActivityIndicator size='large' color='#0044a9' />
        </View>
      :  (<View >
            <View style={styles.spaceInfo}>
              <Icon iconStyle={styles.icon} name={`${spaceSettings.icon}`} type='font-awesome' color={`${spaceSettings.color}`}/>
              <Text style={styles.spaceText}>{name}</Text>
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
  },
  spaceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceText: {
    fontSize: 16
  },
  icon: {
    marginRight: 5
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