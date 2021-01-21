import "react-native-gesture-handler";
import React, {useState, useEffect} from "react";
import { StyleSheet, Alert } from "react-native";
import RootSreen from "./RootStack/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import {ApolloClient, InMemoryCache, from, ApolloProvider, HttpLink } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage'
import authContext from './authContext';
import { setContext } from '@apollo/client/link/context';


const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) =>{
      Alert(`Graphql error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://192.168.1.83:8080/graphql"}),
  
])

const authLink = setContext(async (_, { headers }) => {
  const token =await  AsyncStorage.getItem('@token_key')
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link:   authLink.concat(link),
});


const App = ({ navigation }) => {

  const [authnaticated, setAuthanticated] = useState(false)
  const [account, setAccount] =  useState(null)
  const [userID, setUerID] =  useState();

  client.cache.reset()
  useEffect(() =>{
  
    ( async () =>{
      const token = await AsyncStorage.getItem('@token_key')
      const userSet =  await AsyncStorage.getItem('@userSet')
      if(token){
        setAuthanticated(true)
        setAccount(Boolean(userSet))
      }else{
        setAuthanticated(false)
      }
    })();
    

  }, []);
  
  return (
    <authContext.Provider value={{authnaticated, setAuthanticated,
     account, setAccount, userID, setUerID}}>
      <ApolloProvider client={client}>
      <NavigationContainer>
        <RootSreen />
      </NavigationContainer>
      </ApolloProvider>
    </authContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
