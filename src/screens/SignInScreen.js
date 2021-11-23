import React, { useState,useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, View, Dimensions, Keyboard, Platform } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const { width, height } = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import ModalDropdown from 'react-native-modal-dropdown';
const countryData = require('../Helper/Country.json');
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SetToken } from '../Redux/userDetail'
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux'
import { validatePhone, refreshToken } from "../apiSauce/HttpInteractor";
import { SetUser } from '../Redux/userDetail'


const SignInScreen = ({ navigation }) => {
  GoogleSignin.configure({
    webClientId: '1070204041338-b7qkcgsapabmrtg7an6mm9sapdj4fuaf.apps.googleusercontent.com',
  });

  const dispatch = useDispatch()
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("United States (+1)")
  const [fcmToken, setFcmToken] = useState("")
  const GetToken = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      const token = await messaging().getToken()
      setFcmToken(token)
    }
  }


  useEffect(() => {
    GetToken()
  }, [])

  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
      console.log('This is the google credenia;s', googleCredential);
      const res = await auth().signInWithCredential(googleCredential);
      console.log('res', res);

    } catch (error) {
      console.log(error);
      Toast.show('Something Went Wrong Please Try Again Later!');
    }
  };



  async function signInWithPhoneNumber(phoneNumber, code, isUserExist) {
    try {
      let confirmation = await auth().signInWithPhoneNumber(code + phoneNumber)
      if (confirmation) {
        Toast.show("SMS sent")
        navigation.navigate('VerifyPhoneScreen', { state: confirmation, code: code, phone: phoneNumber, isUserExist: isUserExist })
      }
    } catch (error) {
      console.log(error)
      Toast.show("SMS not sent")
    }
  }

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white", height }}>
        <Text style={styles.headerTextStyle}>Log In or Sign Up</Text>
        <ModalDropdown
          onSelect={(index, country) => setCountry(country)}
          textStyle={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16 }}
          dropdownStyle={{ width: "91%", marginLeft: 15, marginRight: 15 }}
          options={countryData.data.map((data) => data.name + " (+" + data.phonecode + ")")}>
          <View style={[styles.pickerStyle, { marginBottom: 4 }]} >
            <Text style={styles.pickerTitleStyle}>{country}</Text>
            <Image style={{ marginEnd: 40 }} source={require("../assets/down.png")} />
          </View>
        </ModalDropdown>
        <View style={[styles.pickerStyle, { marginTop: 18 }]}>
          <TextInput style={styles.pickerTitleStyle} placeholder="Phone number" keyboardType="number-pad" value={phone} onChangeText={(t) => {
            setPhone(t)
          }}></TextInput>
        </View>

        <Text style={styles.descripTextStyle}>We’ll text to confirm your number{'\n'}Standard message and data rates apply.</Text>

        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
          const code = country.split("(")[1].replace(")", "")
          Keyboard.dismiss()
          validatePhone(code, phone).then(response => {
            if (response.ok) {
              console.log(response.data)
              if (response.data?.status === true) {
                signInWithPhoneNumber(phone, code, false)
              }
              else if (response.data?.data != null) {
                dispatch(SetUser(response.data.data))
                refreshToken(response.data?.data.userType, response.data?.data._id).then(response => {
                  if (response.ok) {
                    console.log(response.data)
                    if (response.data?.status === true) {
                      dispatch(SetToken(response.data.data.token))
                      signInWithPhoneNumber(phone, code, true)
                    }
                    else {
                      Toast.show(response.data.message)
                    }
                  } else {
                    Toast.show(response.data?.message ?? response.problem)
                  }
                }).catch((error) => Toast.show(error.message));

              }
              else {
                Toast.show(response.data.message)
              }
            } else {
              console.log(response)
              Toast.show(response.data?.message ?? response.problem)
            }
          }).catch((error) => Toast.show(error.message));
        }} >
          <Text style={styles.btnTitleStyle}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row",padding:22,justifyContent: 'space-between'}}>
          <View style={{width:'42%',height:1,backgroundColor:'black',alignSelf: "center"}}/>
          <Text style={{ fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Regular,alignSelf: "center",marginTop:4}}>OR</Text>
          <View style={{width:'42%',height:1,backgroundColor:'black',alignSelf: "center"}}/>
        </View>

        <View style={{ flexDirection: "row", marginTop: 0, height: 120, justifyContent: "center", alignContent: "center" }}>
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
            onGoogleButtonPress()
          }}>
            <Image style={{ resizeMode: "contain", width: 80, height: 80 }} source={require("../assets/google.png")} />
          </TouchableOpacity>
          {Platform.OS === "IOS" ?
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
            }}>
              <Image style={{ alignSelf: "center", resizeMode: "contain", width: 80, height: 80, marginLeft: -16 }}
                source={require("../assets/apple.png")} /> </TouchableOpacity> : null}
        </View>
      </View>

    </SafeAreaView>

  );
}

export default SignInScreen


const styles = StyleSheet.create({
  headerTextStyle: {
    marginVertical: 25,
    fontSize: 23,
    alignSelf: "center",
    fontFamily: Custom_Fonts.Montserrat_SemiBold
  },
  btnViewStyle: {
    width: "90%",
    flexDirection: "row",
    height: 50,
    backgroundColor: Colors.themeBlue,
    margin: 18,
    borderRadius: 25,
    justifyContent: "center"
  },
  btnTitleStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 17,
    fontFamily: Custom_Fonts.Montserrat_SemiBold
  },
  descripTextStyle: {
    fontSize: 15,
    marginVertical: 18,
    textAlign:'center',
    fontFamily: Custom_Fonts.Montserrat_Regular
  },
  pickerStyle: {
    width: "90%",
    flexDirection: "row",
    height: 50,
    margin: 18,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between"
  },
  pickerTitleStyle: {
    width: "85%",
    color: "black",
    fontSize: 15,
    fontFamily: Custom_Fonts.Montserrat_Regular,
    marginLeft: 16
  },
  semiBoldTitle: {
    color: "black",
    fontSize: 17,
    fontFamily: Custom_Fonts.Montserrat_SemiBold,
    marginLeft: 16,
    alignSelf: "center"
  },


});
