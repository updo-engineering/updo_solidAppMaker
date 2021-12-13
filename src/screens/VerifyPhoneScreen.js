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
import { validateUser, sendUpdateEmail, sendUpdatePhone,updatePhone,updateEmail } from "../apiSauce/HttpInteractor";

const VerifyPhoneScreen = ({ navigation, route }) => {
  const phone = route.params?.phone
  const code = route.params?.code
  const email = route.params?.email
  const type = route.params?.type
  const [otp, setOtp] = useState(route.params?.Otp)
  const isUserExist = route.params?.isUserExist
  const user = useSelector(state => state.userReducer.user)
  const token = useSelector(state => state.userReducer.token)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  let loginSource = route.params?.loginSource ?? 'phone'
  let error = route.params?.error ?? ''
  let ref = useSelector(state => state.userReducer).ref

  const storeData = async value => {
    setLoading(true);
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('UserDetail', jsonValue);
      dispatch(SetToken(value.token));
      dispatch(SetUser(value.user));
      dispatch(SetAuth(true));
      type == 'update' ? navigation.goBack() : navigation.navigate('TabNavStack')
    } catch (e) {
      Toast.show(e.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = (c) => {
    if (c == otp) {
      if (error != '') {
        Toast.show(error)
      }
      else if (type == 'update') {
        if (loginSource == 'phone') {
          updatePhone(user.user_type == 'Customer', token, code,phone).then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    Toast.show(response.data?.message)
                    storeData({ user: response.data?.data, ref: ref, token: token })
                }
                else {
                    Toast.show(response.data?.message)
                }
            } else {

                Toast.show(response.problem)
            }
        });
        }
        else{
          updateEmail(user.user_type == 'Customer', token, email).then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    Toast.show(response.data?.message)
                    storeData({ user: response.data?.data, ref: ref, token: token })
                }
                else {
                    Toast.show(response.data?.message)
                }
            } else {

                Toast.show(response.problem)
            }
        });
        }
      }
      else if (isUserExist) {
        storeData({
          user: user, token: token, ref: ref
        })
      }
      else {
        navigation.navigate('SelectionScreen', { phone: phone, countryCode: code, loginSource: loginSource, email: email })
      }
    }
    else {
      Toast.show('Invalid OTP...')
    }



  }
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>

      <SafeAreaView>
        <View style={{ backgroundColor: "white", height }}>

          <TopHeaderView title={loginSource == 'phone' ? "Confirm Phone" : "Confirm Email"} />
          <Text style={styles.descripTextStyle}>{loginSource == 'phone' ? 'Enter the code we sent over SMS to (' + code + ')\n' + phone : 'Enter the code we sent over email to ' + email}</Text>

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
            <Text style={styles.descripTextStyle}>{loginSource == 'phone' ? 'Didn’t get an SMS? ' : 'Didn’t get an Email? '}</Text>
            <TouchableOpacity onPress={() => {
              if (type == 'update') {
                if (loginSource == 'phone') {
                  sendUpdatePhone(code, phone, user._id).then(response => {
                    if (response.ok) {
                      if (response.data?.status === true) {
                        Toast.show(response.data?.message)
                        setOtp(response.data?.data?.otp)
                      }
                      else {
                        Toast.show(response.data?.message)
                      }
                    } else {
                      Toast.show(response.problem)
                    }
                  });
                }
                else {
                  sendUpdateEmail(email, user._id).then(response => {
                    if (response.ok) {
                      if (response.data?.status === true) {
                        Toast.show(response.data?.message)
                        setOtp(response.data?.data?.otp)
                      }
                      else {
                        Toast.show(response.data?.message)
                      }
                    } else {
                      Toast.show(response.problem)
                    }
                  });
                }
              }
              else {
                setLoading(true);
                validateUser(code, phone, loginSource, email).then(response => {
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
              }
            }} >
              <Text style={styles.boldTextStyle}>Send again</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <Loader />}
      </SafeAreaView>
    </View>

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
