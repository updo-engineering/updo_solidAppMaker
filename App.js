import React, {useEffect, useState} from "react";
import SplashNavStack from "./src/routers/SplashNavStack"
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, StatusBar, View, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "./src/Redux/store"
import { Colors } from "./src/Colors/Colors";
import {SetUser, SetAuth, SetToken } from './src/Redux/userDetail'
import {StripeProvider} from '@stripe/stripe-react-native';
import Toast from 'react-native-simple-toast';

LogBox.ignoreAllLogs()

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    getUser()
  }, [])

 


  const getUser = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('UserDetail');
      if (value !== null) {
        const result = JSON.parse(value);
        store.dispatch(SetToken(result.token));
        store.dispatch(SetUser(result.user));
        store.dispatch(SetAuth(true));
      } else {
        store.dispatch(SetAuth(false));
      
      }
    } catch (e) {
      setLoading(false);
      Toast.show('Something went wrong please try after sometime');
    }finally {
      setLoading(false);
    }
  };

if(loading) {
  return(
    <View style={{flex: 1, backgroundColor: "white"}}>
      <ActivityIndicator size = "small" color = "red"/>
    </View>
  )
}

  return (
    <StripeProvider publishableKey="pk_test_51Ia3rTJ8HbqT3LtFUbJTOQwG5KLVIwgiSUlwVt51fZM1ns2SL5QFZ6k6kNRnLqCpI75Y2koYhWOe3fdFUnK4JpHZ00DDiUIaPy">
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.blueText} />
        <SplashNavStack />
      </NavigationContainer>
    </Provider>
    </StripeProvider>
  );
}

export default App

