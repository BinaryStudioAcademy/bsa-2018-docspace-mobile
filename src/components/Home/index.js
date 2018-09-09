import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { getAllSpacesRequest } from '../SpacesList/logic/spacesActions';
import { allSpaces } from '../SpacesList/logic/spacesReducer';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'



class Home extends Component {
  componentDidMount () {
    this.props.getAllSpaces()
  }

  getMySpaces = () => {
    const {allSpaces, user} = this.props
    return allSpaces.filter(space => space.ownerId === user._id)
  }
  render () {
    const {allSpaces, user} = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{uri: `${user.avatar}`}}
            />
            <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={styles.userInfo}>{`${user.email}`}</Text>
            <Text style={styles.userInfo}>{`${user.login}`}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Icon
                iconStyle={styles.icon}
                name='people'
                type='eionicon'
                color='#517fa4'
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info} onPress={() => Actions.spaces({spaces:allSpaces})}>All spaces</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.iconContent}>
            <Icon
                iconStyle={styles.icon}
                name='person'
                type='eionicon'
                color='#517fa4'
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info} onPress={() => Actions.spaces({spaces:this.getMySpaces()})}>My spaces</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Home.defaultProps = {
  allSpaces: [],
  user: {}
}
const mapStateToProps = state => ({
  allSpaces: allSpaces(state),
  user: state.login.user

})

const mapDispatchToProps = dispatch => ({
  getAllSpaces: bindActionCreators(getAllSpacesRequest, dispatch)
})


export default connect(mapStateToProps,mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#172b4d",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:16,
    color:"#fff",
    fontWeight:'500',
  },
  userInfo:{
    fontSize:12,
    color:"#eaf2ff"
  },
  body:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item:{
    flexDirection :'row',
    margin: 5
  },
  // infoContent:{
  //   flex:1,
  //   alignItems:'flex-start',
  //   paddingLeft:5
  // },
  // iconContent:{
  //   flex:1,
  //   alignItems:'flex-end',
  //   paddingRight:5,
  // },
  icon:{
    width:30,
    height:30,
    marginTop:15,
  },
  info:{
    fontSize:14,
    marginTop:15,
  }
});

