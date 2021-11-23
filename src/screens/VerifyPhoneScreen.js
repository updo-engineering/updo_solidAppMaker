import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions, View, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "./TopHeader/TopHeaderView";
import OTPInputView from '@twotalltotems/react-native-otp-input'
const { width, height } = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/loader'
import { useDispatch, useSelector } from 'react-redux'
import { SetAuth, SetToken, SetUser } from '../Redux/userDetail'

const VerifyPhoneScreen = ({ navigation, route }) => {
  const [state, setState] = useState(null)
  const phone = route.params?.phone
  const code = route.params?.code
  const isUserExist = route.params?.isUserExist
  const user = useSelector(state => state.userReducer.user)
  const token = useSelector(state => state.userReducer.token)
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)

  React.useEffect(() => {
    console.log(route)
    if (route?.params?.state) {
      setState(route?.params?.state)
    }
  }, [route])

  async function signInWithPhoneNumber(phoneNumber) {
    await auth().signInWithPhoneNumber(phoneNumber).then((result) => {
      console.log(result)
      if (result) {
        setState(result)
        Toast.show("SMS sent")
      }
    }).catch((error) => {
      console.log(error)
      Toast.show("SMS not sent")
    });

  }

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

  async function confirmCode(c) {
    try {
      await state.confirm(c).then((result) => {
        if (result) {
          if (isUserExist) {
            storeData({
              user: user, token: token,
            })
          }
          else {
            navigation.navigate('SelectionScreen', { phone: phone, countryCode: code })
          }
        }
      }).catch((error) => {
        console.log(error)
        Toast.show("Invalid OTP")
      });
    } catch (error) {
      console.log(error)
      Toast.show("Invalid OTP.")
    }
  }
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white", height }}>

        <TopHeaderView title="Confirm your number" />
        <Text style={styles.descripTextStyle}>Enter the code we sent over SMS to ({code+')\n' + phone} </Text>

        <OTPInputView
          style={{ width: '90%', height: 120, alignSelf: "center" }}
          pinCount={6}
          onCodeChanged={(code) => console.log(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleHighLighted}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(c => {
            confirmCode(c)
          })}
        />

        <View style={{ flexDirection: "row", marginTop: 8, height: 60 }}>
          <Text style={styles.descripTextStyle}>Didn’t get an SMS? </Text>
          <TouchableOpacity onPress={() => {
            signInWithPhoneNumber(code + phone)
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
