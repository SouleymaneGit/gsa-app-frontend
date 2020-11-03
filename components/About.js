import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  navigate,
} from "react-native";
import Home from "../components/Home";

export default class About extends Component {
  render() {
    return (
      <KeyboardAvoidingView Behavior="padding" style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AboutAuth")}
        >
          <View style={styles.GoBackBttn}>
            <Button
              title="Go back"
              onPress={() => this.props.navigation.navigate("Home")}
            ></Button>
            <Text style={styles.about}>
              The Guinean Students Association is a group of students who have
              the same goal....
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    width: Dimensions.get("window").width,
  },
  about: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  GoBackBttn: {
    textAlign: "right",
  },
});
