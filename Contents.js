import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
export default class Contents extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
        </View>
       
        <View style={styles.contentsView}>
          <View  style={styles.input}>
          <View style={styles.inputView}>
         <TextInput
              placeholder="Full name"
              style={styles.contents}
              autoCapitalize="none"
            ></TextInput>
            <TextInput
              placeholder="School"
              style={styles.contents}
              autoCapitalize="none"
            ></TextInput>
            <TextInput
              placeholder="Major"
              style={styles.contents}
            ></TextInput>
            <TextInput
              placeholder="Role"
              style={styles.contents}
            ></TextInput>
            <TextInput
              placeholder="Skills"
              style={styles.contents}
            ></TextInput>
            <TextInput
              placeholder="Interes"
              style={styles.contents}
            ></TextInput>
          </View>
            <View style={styles.BttnView}>
            <TouchableOpacity style={styles.BtnView} 
            onPress={() => this.props.navigation.navigate('Change Password')}>
              <Text style={styles.ChangePasswordBtn}>Change Password </Text>
            </TouchableOpacity>
            <View>
            <TouchableOpacity style={styles.BtnView} 
            onPress={() => this.props.navigation.navigate('Logout')}>
              <Text style={styles.LogoutButton}>Logout</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
        
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  headerView:{
    top: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#DCD6D6",
  },
  inputView:{
    backgroundColor: "#dcd6d6",
  },
  
  logoText:{
    color: '#fff',
    textAlign: 'center'
  },
  input:{
    marginTop: 20
  },
  BttnView:{
      padding:20,
  },
contents: {
    height: 40,
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
    width: 400,
   borderBottomWidth: 1,
   borderColor: "white",
    fontWeight: "bold",
    color: "#040a14",
    
  },
  BtnView:{
      padding: 20,
  },
ChangePasswordBtn: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
    borderWidth:1,
    borderRadius: 5, 
    backgroundColor:"#DCD6D6",    
  },
  LogoutButton: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 300,
  },
  MemberLogin: {
    paddingVertical: 10,
  },
});

