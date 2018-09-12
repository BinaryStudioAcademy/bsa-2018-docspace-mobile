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
  render() {
    const { user } = this.props;
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
          <View style={styles.item}>
            <View>
              <Icon name="info" size={20} iconStyle={styles.icon} />
            </View>
            <View>
              <Text style={styles.mainText}>{user.login}</Text>
              <Text style={styles.secondaryText}>Nickname</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View>
              <Icon name="email" size={20} iconStyle={styles.icon} />
            </View>
            <View>
              <Text style={styles.mainText}>{user.email}</Text>
              <Text style={styles.secondaryText}>Email</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Home.defaultProps = {
  user: {}
};
const mapStateToProps = state => ({
  user: state.login.user
});


export default connect(mapStateToProps)(Home);

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
    flex: 1,
    backgroundColor: "#172b4d"
  },
  headerContent: {
    padding: 25,
    alignItems: "center"
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 8
  },
  boxTwo: {
    flex: 1.5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
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
