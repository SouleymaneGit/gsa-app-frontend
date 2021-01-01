import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  As,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
import{useMutation} from '@apollo/client';
import {LOGIN} from '../../GraphQl/mutation';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import { Entypo} from '@expo/vector-icons';
const Login =(props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');
  const [hidePass, setHidePass] = useState(true)
  const [login, {error}] =  useMutation(LOGIN)

  const onSubmit = () =>{
    login({
      variables:{
        email: email,
        password: password
      }
    }).then(async (res)  =>{
      if(res.data.login.success){
        await AsyncStorage.setItem('@token_key', res.data.login.token)
      }

    }).catch(error =>{
      Alert(error);
    })
    if(error){
      Alert(error);
    }
  }
  

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.login}>
        <View style={styles.logoView}>
          <View style={styles.logo}>
            <Text style={styles.logoText} >LOGO</Text>
          </View>
          <TouchableOpacity  style={styles.signBtn}
          onPress={() => props.navigation.navigate('Signup')}>
          <Text style={styles.LoginTitle}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View  style={styles.input}>
          <TextInput
            placeholder="Email"
            style={styles.username}
            autoCapitalize="none"
            value={email}
            onChangeText={e => setEmail(e)}
          ></TextInput>
          <TextInput
            placeholder="Password"
            secureTextEntry={hidePass}
            style={styles.username}
            value={password}
            onChangeText={e => setPassword(e)}
          ></TextInput>
            {/* <Button onPress={onSubmit} title="LOGIN"/> */}
          <TouchableOpacity style={styles.LoginView} 
          onPress={onSubmit}>
            <Text style={styles.LoginButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPassword} 
          onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.LoginButton}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </KeyboardAvoidingView>
  );

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
  logoView:{
    alignItems: 'center',
    marginTop: 100,
  },
  logo:{
    height: 100,
    backgroundColor: '#000',
    width: 100,
    borderRadius: 25,
    justifyContent: 'center'
  },
  logoText:{
    color: '#fff',
    textAlign: 'center'
  },
  input:{
    marginTop: 20
  },
  login:{
    alignItems: 'center',
    marginTop: 100,

  //   margin: 100,
  //   marginHorizontal: 20,
  //  justifyContent: 'center',
  //  alignContent: 'center',
  //  height: 100
  },
  username: {
    height: 40,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
    width: 400
  },
  signBtn:{
    marginTop: 10,
    marginBottom: 10
  },
  LoginTitle: {
    fontSize: 16,
    fontWeight: '900'
  },
  LoginButton: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
  MemberLogin: {
    paddingVertical: 10,
  },
  LoginView: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    height: 37,
    width: 125,
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
    justifyContent:'center',
    alignSelf: 'center'
  },
  ForgotPasswordView: {
    paddingVertical: 5,
  },
  ForgotPasswordBttn: {
    textAlign: "center",
  },
});

export default Login

