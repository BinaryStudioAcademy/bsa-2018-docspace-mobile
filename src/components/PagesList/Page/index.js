import React, { Component } from 'react';
import { StyleSheet, View, Text,ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getPageByIdRequest } from '../../PagesList/logic/pagesActions'
import HTMLView from 'react-native-htmlview';


class Page extends Component {
  componentDidMount () {
    this.props.getPageById(this.props.pageId)
  }
  render () {
    const {page, isFetching} = this.props
    return isFetching
      ? <View style={styles.fetching}>
          <ActivityIndicator size='large' color='#0044a9' />
        </View>
      : <View>
          <View>
            <Text>{page.title}</Text>
          </View>
          <ScrollView>
            <HTMLView value={page.content} />
          </ScrollView>
        </View>
  }
}

Page.defaultProps = {
  page: {}
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
  page: state.pages.byId[props.pageId],
  isFetching: state.pages.isFetching
})

const mapDispatchToProps = dispatch => ({
  getPageById: bindActionCreators(getPageByIdRequest, dispatch)
})

export default connect(mapStateToPops, mapDispatchToProps)(Page)