import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions, View, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "./TopHeader/TopHeaderView";
import OTPInputView from '@twotalltotems/react-native-otp-input'
const { width, height } = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/loader'
import { useDispatch, useSelector } from 'react-redux'
import { SetAuth, SetToken, SetUser } from '../Redux/userDetail'
import { validateUser } from "../apiSauce/HttpInteractor";

const VerifyPhoneScreen = ({ navigation, route }) => {
  const phone = route.params?.phone
  const code = route.params?.code
  const email = route.params?.email
  const [otp, setOtp] = useState(route.params?.Otp)
  const isUserExist = route.params?.isUserExist
  const user = useSelector(state => state.userReducer.user)
  const token = useSelector(state => state.userReducer.token)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  let loginSource = route.params?.loginSource ?? 'phone'
  let error = route.params?.error ?? ''

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

  const confirmCode = (c) => {
    if (c == otp) {
      if (error != ''){
        Toast.show(error)
      }
      else if (isUserExist) {
        storeData({
          user: user, token: token,
        })
      }
      else {
        navigation.navigate('SelectionScreen', { phone: phone, countryCode: code,loginSource:loginSource,email:email })
      }
    }
    else {
      Toast.show('Invalid OTP...')
    }



  }
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white", height }}>

        <TopHeaderView title="Confirm your number" />
        <Text style={styles.descripTextStyle}>{loginSource == 'phone' ? 'Enter the code we sent over SMS to ('+code+')\n'+phone : 'Enter the code we sent over email to '+email}</Text>

        <OTPInputView
          style={{ width: '90%', height: 120, alignSelf: "center" }}
          pinCount={4}
          onCodeChanged={(code) => console.log(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleHighLighted}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(c => {
            confirmCode(c)
          })}
        />

        <View style={{ flexDirection: "row", marginTop: 8, height: 60 }}>
          <Text style={styles.descripTextStyle}>{loginSource == 'phone' ? 'Didn’t get an SMS? ' :'Didn’t get an Email? '}</Text>
          <TouchableOpacity onPress={() => {
            setLoading(true);
            validateUser(code, phone, loginSource,email).then(response => {
              if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                  Toast.show("SMS sent")
                  setOtp(response.data?.other?.otp)
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
            <Text style={styles.boldTextStyle}>Send again</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <Loader />}
    </SafeAreaView>

  );
}

export default VerifyPhoneScreen


const styles = StyleSheet.create({
  descripTextStyle: {
    fontSize: 16,
    marginLeft: 18,
    fontFamily: Custom_Fonts.Montserrat_Medium
  },
  underlineStyleHighLighted: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    width: width * 0.13,
    height: 60,
  },
  boldTextStyle: {
    fontSize: 16,
    fontFamily: Custom_Fonts.Montserrat_Bold,
    textDecorationLine: "underline"
  },
});
