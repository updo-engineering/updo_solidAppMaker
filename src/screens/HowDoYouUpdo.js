import React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity ,Dimensions} from "react-native";
import {Custom_Fonts} from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Redux/userDetail";
const { width, height } = Dimensions.get('window');

const HowDoYouUpdo = ({ navigation,route }) => {
  const phone=route.params?.phone
  const countryCode=route.params?.countryCode
  let dispatch = useDispatch()
  let profile = useSelector(state=>state.userReducer).profile
  console.log(profile)
  console.log(route)
  return (
    <SafeAreaView>
      <View style = {{backgroundColor:"white",height}}>
      <TopHeaderView title="How Do You Updo?"/>
      <View>
        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {

          profile={
            ...profile,
            type:"Find",
            phone:phone,
            countryCode:countryCode,
            isCustomer:true
          }
          dispatch(setProfile(profile))
          navigation.navigate('CreateYourProfile',{type:"Find",phone:phone,countryCode:countryCode,isCustomer:true})
        }} >
          <Text style={styles.btnTitleStyle}>Find Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
           profile={
            ...profile,
            type:"Service",
            phone:phone,
            countryCode:countryCode,
            isCustomer:false
          }
          dispatch(setProfile(profile))
         navigation.navigate('CreateYourProfile',{type:"Service",phone:phone,countryCode:countryCode,isCustomer:false})
        }} >
          <Text style={styles.btnTitleStyle}>Provide Services</Text>
        </TouchableOpacity>

      </View>
      </View>
    </SafeAreaView>

  );
}

export default HowDoYouUpdo


const styles = StyleSheet.create({
  headerTextStyle: {
    margin: 20,
    fontSize: 25,
    fontFamily:Custom_Fonts.Montserrat_Bold
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
    alignSelf: "center",
    color: "white",
    fontSize: 17,
    fontFamily:Custom_Fonts.Montserrat_SemiBold
  },
  descripTextStyle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily:Custom_Fonts.Montserrat_Regular
  }


});
