import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const { width, height } = Dimensions.get('window');
import { SetType } from '../Redux/userDetail'
import { useDispatch } from 'react-redux'
import { newUser } from "../apiSauce/HttpInteractor";
import Loader from '../Components/loader'
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetAuth, SetToken, SetUser } from '../Redux/userDetail'

const SelectionScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  let loginSource = route.params?.loginSource ?? 'phone'
  let email = route.params?.email ?? ''
  let authToken = route.params?.authToken ?? ''
  let phone = route.params?.phone ?? ''
  let countryCode = route.params?.countryCode ?? ''
  const [loading, setLoading] = useState(false)

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

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white", height, justifyContent: 'space-between' }}>
        <Text style={styles.headerTextStyle}>How do you TipTop?</Text>

        <View style={{ justifyContent: "center", height: "70%" }}>
          <TouchableOpacity onPress={() => {
            setLoading(true);
            console.log(countryCode, phone, loginSource, email, authToken, 'Customer')
            newUser(countryCode, phone, loginSource, email, authToken, 'Customer').then(response => {
              if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                  dispatch(SetType('Customer'));
                  console.log("user",response.data?.data)
                  storeData({
                    user: response.data?.data?.data, token: response.data?.data?.data?.token,
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
            console.log(countryCode, phone, loginSource, email, authToken, 'Provider')
            newUser(countryCode, phone, loginSource, email, authToken, 'Provider').then(response => {
              if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                  dispatch(SetType('Service'));
                  navigation.navigate('ProfileSubmitted')
                  // storeData({
                  //   user: response.data?.data, token: response.data?.data?.token,
                  // })
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
      </View>
      {loading && <Loader />}
    </SafeAreaView>

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
