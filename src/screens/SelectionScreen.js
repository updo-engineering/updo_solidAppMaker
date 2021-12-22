import React, { useState,useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image,Platform } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const { width, height } = Dimensions.get('window');
import { SetType } from '../Redux/userDetail'
import { useDispatch,useSelector } from 'react-redux'
import { newUser } from "../apiSauce/HttpInteractor";
import Loader from '../Components/loader'
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetAuth, SetToken, SetUser } from '../Redux/userDetail'
import messaging from '@react-native-firebase/messaging';

const SelectionScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  let loginSource = route?.params?.loginSource ?? 'phone'
  let socialImg = route?.params?.socialImg ?? ''
  let socialName = route?.params?.socialName ?? ''
  let email = route?.params?.email ?? ''
  let authToken = route?.params?.authToken ?? ''
  let phone = route?.params?.phone ?? ''
  let countryCode = route?.params?.countryCode ?? ''
  const [loading, setLoading] = useState(false)
  let ref = useSelector(state => state.userReducer).ref
  const [fcmToken, setFcmToken] = useState("")

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('UserDetail', jsonValue);
      dispatch(SetToken(value.token));
      dispatch(SetUser(value.user));
      dispatch(SetAuth(true));
      navigation.navigate('TabNavStack')
    } catch (e) {
      Toast.show('Something Went Wrong Please Try Again Later');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() =>{
    GetToken()
  }, [])

  const GetToken = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        const token = await messaging().getToken()
        setFcmToken(token)
        console.log(token)
    }
}

  return (
    
      <View style={{ backgroundColor: "white", height, justifyContent: 'space-between' }}>
        <SafeAreaView>
        <Text style={styles.headerTextStyle}>How do you TipTop?</Text>

        <View style={{ justifyContent: "center", height: "70%" }}>
          <TouchableOpacity onPress={() => {
            setLoading(true);
            console.log(countryCode, phone, loginSource, email, authToken, 'Customer')
            newUser(countryCode, phone, loginSource, email, authToken, 'Customer',socialName,socialImg,fcmToken,Platform.OS).then(response => {
              if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                  dispatch(SetType('Customer'));
                  console.log("user",response.data?.data)
                  storeData({
                    user: response.data?.data?.data, token: response.data?.data?.data?.token,ref:ref
                  })
                }
                else {
                  Toast.show(response.data.message)
                }
              } else {
                setLoading(false);
                Toast.show(response.data?.message ?? response.problem)
              }
            }).catch((error) => Toast.show(error.message));
          }} >
            <View style={{ paddingHorizontal: 30, paddingVertical: 60, borderColor: 'grey', borderTopWidth: 1, borderBottomWidth: 1 }}>
              <Text style={styles.btnTitleStyle}>Find Services</Text>
              <Image style={{ resizeMode: "contain", width: 20, height: 20, marginHorizontal: 12, marginVertical: 14, position: "absolute", end: 8, top: 50 }} source={require("../assets/rightArrow.png")}></Image>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
           // setLoading(true);
          
            newUser(countryCode, phone, loginSource, email, authToken, 'Provider',socialName,socialImg,fcmToken,Platform.OS).then(response => {
              if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                  dispatch(SetType('Service'));
                  console.log("provider",response.data?.data)
                  storeData({
                    user: response.data?.data?.data, token: response.data?.data?.data?.token,ref:ref
                  })
                }
                else {
                  Toast.show(response.data.message)
                }
              } else {
                setLoading(false);
                Toast.show(response.data?.message ?? response.problem)
              }
            }).catch((error) => Toast.show(error.message));

          }} >
            <View style={{ paddingHorizontal: 30, paddingVertical: 60, borderColor: 'grey', borderBottomWidth: 1 }}>

              <Text style={styles.btnTitleStyle}>Provide Services</Text>
              <Image style={{ resizeMode: "contain", width: 20, height: 20, marginHorizontal: 12, marginVertical: 14, position: "absolute", end: 8, top: 50 }} source={require("../assets/rightArrow.png")}></Image>

            </View>
          </TouchableOpacity>

        </View>

        <View style={{ marginBottom: 12 }}>
          <Image style={{ width: 60, height: 60, alignSelf: 'center' }} source={require("../assets/logoIcon.png")}></Image>
          <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, color: '#03409D' }}>Dream big. Start small.</Text>
          <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily: Custom_Fonts.Montserrat_Medium, color: '#00A8E0' }}>Above all, start.</Text>
        </View>
        </SafeAreaView>
        {loading && <Loader />}

      </View>
   

  );
}

export default SelectionScreen


const styles = StyleSheet.create({
  headerTextStyle: {
    margin: 20,
    fontSize: 23,
    fontFamily: Custom_Fonts.Montserrat_SemiBold, alignSelf: 'center'
  },
  btnViewStyle: {
    height: 50,
    backgroundColor: Colors.themeBlue,
    margin: 12,
    borderRadius: 25,
    justifyContent: "center"
  }
  ,
  btnTitleStyle: {
    color: "black",
    fontSize: 17,
    fontFamily: Custom_Fonts.Montserrat_Medium
  },
  descripTextStyle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: Custom_Fonts.Montserrat_Regular
  }


});
