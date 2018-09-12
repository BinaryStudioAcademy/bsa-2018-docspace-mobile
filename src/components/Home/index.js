import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { bindActionCreators } from "redux";
import { getAllSpacesRequest } from "../SpacesList/logic/spacesActions";
import { allSpaces } from "../SpacesList/logic/spacesReducer";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { logoutRequest } from '../Login/logic/loginActions'
import penguinImg from '../../images/logoAnimalwhite.png'
import SideMenu from 'react-native-side-menu'

class ContentView extends Component {
  render () {
    const { allSpaces, getMySpaces } = this.props
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.boxContainer, styles.boxOne]}>
          <View style={styles.headerContent}>
            <Image style={styles.logo} source={penguinImg} />
            <Text style={styles.siteName}>DOCSPACE</Text>
          </View>
        </View>
        <View style={[styles.boxContainer, styles.boxTwo]}>

          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => Actions.spaces({ spaces: allSpaces })}
            >
              <View style={styles.iconContent}>
                <Icon iconStyle={styles.icon} name="people" size={30}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>All spaces</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => Actions.spaces({ spaces: getMySpaces() })}
            >
              <View style={styles.iconContent}>
                <Icon iconStyle={styles.icon} name="person" size={30} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>My spaces</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}

class Menu extends Component {
  render () {
    const { user, logout } = this.props
    return (
      <View style={styles.menuContent}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar} source={{ uri: `${user.avatar}` }} />
          <Text style={styles.name}>{`${user.firstName} ${
          user.lastName
        }`}</Text>
        </View>

        <View style={[styles.item, styles.home]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Actions.home }
          >
            <View style={styles.iconContent}>
              <Icon iconStyle={styles.icon} type='font-awesome' name="home" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Home</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.item, styles.profile]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Actions.profile({user}) }
          >
            <View style={styles.iconContent}>
              <Icon iconStyle={styles.icon} type='font-awesome' name="user" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.item, styles.logout]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => logout() }
          >
            <View style={styles.iconContent}>
              <Icon iconStyle={styles.icon} type='materialIcons' name="directions-run" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
class Home extends Component {
  componentDidMount() {
    this.props.getAllSpaces();
  }

  getMySpaces = () => {
    const { allSpaces, user } = this.props;
    return allSpaces.filter(space => space.ownerId === user._id);
  };

  handleLogout = () => {
    this.props.logout()
  }

  render() {
    const { allSpaces, user } = this.props;
    const menu = <Menu user={user} logout={this.handleLogout} />;
    return (
        <SideMenu menu={menu}>
          <ContentView allSpaces={allSpaces} getMySpaces={this.getMySpaces} />
        </SideMenu>
      );
    }
  }


Home.defaultProps = {
  allSpaces: [],
  user: {}
};
const mapStateToProps = state => ({
  allSpaces: allSpaces(state),
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  getAllSpaces: bindActionCreators(getAllSpacesRequest, dispatch),
  logout: bindActionCreators(logoutRequest, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column"
  },
  menuContent: {
    flex: 1,
    flexDirection: "column",
  },
  boxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  boxOne: {
    flex: 2,
    backgroundColor: "#172b4d"
  },
  headerContent: {
    marginTop: 40,
    marginBottom: 20,
    padding: 25,
    alignItems: "center"
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 8
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#172b4d",
    marginBottom: 8
  },
  siteName: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "400"
  },
  name: {
    fontSize: 16,
    color: "black",
    fontWeight: "400"
  },
  boxTwo: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  userItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  icon: {
    marginRight: 5,
    color: "#3a65ad",
  },
  mainText: {
    fontSize: 16,
    color: "#000000cc"
  },
  secondaryText: {
    fontSize: 12,
    color: "#00000080"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    fontSize: 16
  },
  logout: {
    marginTop: 200
  }

});
