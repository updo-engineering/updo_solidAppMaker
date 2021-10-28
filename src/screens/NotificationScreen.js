import React from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity,View } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import messaging from '@react-native-firebase/messaging';
import { useSelector,useDispatch } from "react-redux"
import { setProfile } from "../Redux/userDetail";

const NotificationScreen = ({navigation,route}) => {
  let dispatch = useDispatch()
  const phone=route.params?.phone
  const countryCode=route.params?.countryCode
  const ty = useSelector(state => state.userReducer.type)
  let profile = useSelector(state=>state.userReducer).profile    
    profile={
      ...profile,
      type:ty,
      phone:phone,
      countryCode:countryCode,
      isCustomer:ty=="Customer"
    }

    async function requestUserPermission() {
      const authorizationStatus = await messaging().requestPermission();
    
      if (authorizationStatus) {
        console.log('Permission status:', authorizationStatus);
      }
    }

  return (
    <SafeAreaView>
    <TopHeaderView title = "Turn on notifications?"/>
    <Text style={styles.descripTextStyle}>Don’t miss out important messages and stay updated.</Text>
    <View style = {{flexDirection:"row",justifyContent:"space-between",marginTop:40}}>
    <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
      requestUserPermission()
      dispatch(setProfile(profile))
      navigation.navigate('CreateYourProfile',{type:ty,phone:phone,countryCode:countryCode,isCustomer:ty=="Customer"})
        }} >
          <Text style={styles.btnTitleStyle}>Notify me</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnFadeViewStyle} onPress={() => {
          dispatch(setProfile(profile))
          navigation.navigate('CreateYourProfile',{type:ty,phone:phone,countryCode:countryCode,isCustomer:ty=="Customer"})
        }} >
          <Text style={styles.btnTitleStyle}>Skip</Text>
       </TouchableOpacity>
    </View>
    </SafeAreaView>

  );
}



export default NotificationScreen


const styles = StyleSheet.create({
  descripTextStyle: {
    fontSize: 16,
    marginLeft:18,
    fontFamily:Custom_Fonts.Montserrat_Regular
  },
  btnViewStyle: {
    width:"45%",
    flexDirection:"row",
    height: 50,
    backgroundColor: Colors.themeBlue,
    marginTop: 18,
    marginLeft:12,
    marginEnd:12,
    borderRadius: 25,
    justifyContent: "center"
  },
  btnFadeViewStyle: {
    width:"45%",
    flexDirection:"row",
    height: 50,
    backgroundColor: Colors.greyColor,
    marginTop: 18,
    marginEnd:12,
    borderRadius: 25,
    justifyContent: "center"
  },
  btnTitleStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 17,
    fontFamily:Custom_Fonts.Montserrat_SemiBold
  },
});
