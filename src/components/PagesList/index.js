import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';


class PagesList extends Component {
  render () {
    return (
      <View containerStyle={{marginBottom: 20}}>
        {this.props.pages.map(page => (
           <ListItem
              key={page._id}
              title={page.title}
              onPress={() => Actions.page({ pageId: page._id})}
           />
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

PagesList.defaultProps = {
  pages: []
}


export default PagesList
// export default PagesList