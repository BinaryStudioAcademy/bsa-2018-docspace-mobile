import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { bindActionCreators } from "redux";
import { getAllSpacesRequest } from "../SpacesList/logic/spacesActions";
import { allSpaces } from "../SpacesList/logic/spacesReducer";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { logoutRequest } from '../Login/logic/loginActions'

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
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.boxContainer, styles.boxOne]}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={{ uri: `${user.avatar}` }} />
            <Text style={styles.name}>{`${user.firstName} ${
              user.lastName
            }`}</Text>
          </View>
        </View>
        <View style={[styles.boxContainer, styles.boxTwo]}>
          <Icon name="info" size={20} iconStyle={styles.icon} />
          <View>
            <Text style={styles.mainText}>{user.login}</Text>
            <Text style={styles.secondaryText}>Nickname</Text>
          </View>

          <Icon name="email" size={20} iconStyle={styles.icon} />
          <View>
            <Text style={styles.mainText}>{user.email}</Text>
            <Text style={styles.secondaryText}>Email</Text>
          </View>
        </View>

        <View style={[styles.boxContainer, styles.boxThree]}>

          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => Actions.spaces({ spaces: allSpaces })}
            >
              <View style={styles.iconContent}>
                <Icon iconStyle={styles.icon} name="people" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>All spaces</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => Actions.spaces({ spaces: this.getMySpaces() })}
            >
              <View style={styles.iconContent}>
                <Icon iconStyle={styles.icon} name="person" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>My spaces</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => this.handleLogout() }
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
      </View>
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
    padding: 25,
    alignItems: "center"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 8
  },
  name: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "400"
  },
  boxTwo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  boxThree: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  item: {
    flexDirection: "row",
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
    color: "#3a65ad"
  },
  mainText: {
    fontSize: 16,
    color: "#000000cc"
  },
  secondaryText: {
    fontSize: 12,
    color: "#00000080"
  }
});
