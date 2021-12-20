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
import { useDispatch,useSelector } from 'react-redux'
import { validateUser, refreshToken } from "../apiSauce/HttpInteractor";
import { SetUser,SetToken,SetAuth } from '../Redux/userDetail'
import Loader from '../Components/loader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';


const SignInScreen = ({ navigation }) => {
  GoogleSignin.configure({
    webClientId: '1059785473099-ddjced93rttiok2mu102ikm0o17337lb.apps.googleusercontent.com',
  });
  const dispatch = useDispatch()
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("United States (+1)")
  const [loading, setLoading] = useState(false)
  let ref = useSelector(state => state.userReducer).ref

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async value => {
    setLoading(true);
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
  


  const onAppleButtonPress = async() => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }
      const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    console.log(appleCredential)

    return auth().signInWithCredential(appleCredential);
  }


  const onFacebookButtonPress = async() =>{
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  console.log(facebookCredential)
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }


  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
      console.log('This is the google credenia;s', googleCredential);
      const res = await auth().signInWithCredential(googleCredential);
      console.log('res', res);
      setLoading(true)
      validateUser("", "",'social',res?.user?.email,'').then(response => {
        if (response.ok) {
          setLoading(false)
          if (response.data?.status === true && response.data?.other?.status == 'new'){
            navigation.navigate('SelectionScreen', { phone: "", countryCode: "",loginSource:"social",email:res?.user?.email,socialName:res?.user?.displayName,socialImg:res?.user?.photoURL })
          }
          else if (response.data?.data != null) {
            let user = response.data.data
            dispatch(SetUser(response.data.data))
            setLoading(true)
            refreshToken(response.data?.data.user_type, response.data?.data._id).then(response => {
              if (response.ok) {
                setLoading(false)
                if (response.data?.status === true) {
                  dispatch(SetToken(response.data.data.token))
                    storeData({user: user, token: response.data.data.token,ref:ref})
                }
              } else {
                signOut()
                setLoading(false)
                Toast.show(response.data?.message ?? response.problem)
              }
            }).catch((error) => {Toast.show(error.message)
              signOut()
              setLoading(false)
            });
          }
          else {
            setLoading(false)
            signOut()
            Toast.show(response.data.message)
          }
        } else {
          setLoading(false)
          signOut()
          Toast.show(response.data?.message ?? response.problem)
        }
      }).catch((error) => Toast.show(error.message));
    } catch (error) {
      console.log(error);
      Toast.show(error.message ?? 'Something Went Wrong Please Try Again Later!');
    }
  };

  return (
    <View style={{width: '100%', height: '100%',backgroundColor: 'white'}}>
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
          setLoading(true)
          validateUser(code, phone,'phone').then(response => {
            if (response.ok) {
              setLoading(false)
              if (response.data?.status === true && response.data?.other?.status == 'new'){
                Toast.show("SMS sent")
                navigation.navigate('VerifyPhoneScreen', { Otp: response.data?.other?.otp, code: code, phone: phone, isUserExist: false,loginSource:'phone'})
              }
              else if (response.data?.data != null) {
                dispatch(SetUser(response.data.data))
                let otp = response.data?.other?.otp
                setLoading(true)
                refreshToken(response.data?.data.user_type, response.data?.data._id).then(response => {
                  if (response.ok) {
                    setLoading(false)
                    if (response.data?.status === true) {
                      dispatch(SetToken(response.data.data.token))
                      navigation.navigate('VerifyPhoneScreen', { Otp: otp, code: code, phone: phone, isUserExist: true,loginSource:'phone'})
                    }
                  } else {
                    setLoading(false)
                    Toast.show(response.data?.message ?? response.problem)
                  }
                }).catch((error) => {Toast.show(error.message)
                  setLoading(false)
                });
              }
              else {
                setLoading(false)
                Toast.show(response.data.message)
              }
            } else {
              setLoading(false)
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

        <View style={{ flexDirection: "row", marginTop: 0, height: 120, justifyContent: 'space-between', alignContent: "center",marginHorizontal:16 }}>
        <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
           navigation.navigate('EmailLogin')
          }}>
            <Image style={{ resizeMode: "contain", width: 80, height: 80 }} source={require("../assets/email.png")} />
          </TouchableOpacity>

          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
            onFacebookButtonPress()
          }}>
            <Image style={{ resizeMode: "contain", width: 80, height: 80 }} source={require("../assets/fb.png")} />
          </TouchableOpacity>

          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
            onGoogleButtonPress()
          }}>
            <Image style={{ resizeMode: "contain", width: 80, height: 80 }} source={require("../assets/google.png")} />
          </TouchableOpacity>


          {Platform.OS === "ios" ?
             <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
              onAppleButtonPress()
             }}>
               <Image style={{ resizeMode: "contain", width: 80, height: 80 }} source={require("../assets/apple.png")} />
             </TouchableOpacity> : null}
        </View>
      </View>
      {loading && <Loader />}

    </SafeAreaView>
    </View>

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
    alignSelf: "center",
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
