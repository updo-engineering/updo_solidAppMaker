import React, { useEffect } from "react";
import { Image, StyleSheet,View,Text } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
const ProfileSubmitted = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignInScreen')
    }, 3000);
  }, []);
  return (
      <View style = {{justifyContent:"center",alignContent:"center",height:"100%"}}>
      <View style = {styles.pickerStyle}>
     <Image style = {styles.imageStyle} source = {require("../assets/check.png")}></Image>
     <Text style={{ fontSize: 17, marginHorizontal: 18,textAlign:"center", fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 0 }}>You have successfully submitted your profile! </Text>
     <Text style={{ fontSize: 14, marginHorizontal: 18,textAlign:"center",fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 12 }}>Now our team will review your profile and let you know if you are approved by email or notification :)</Text>

      </View>
      </View>
  );
}

export default ProfileSubmitted


const styles = StyleSheet.create({
    pickerStyle: {
      width: "90%",
      height: 350,
      margin: 18,
      backgroundColor: "white",
      shadowColor: "grey",
      borderRadius: 25,
      shadowOpacity: 0.4,
      elevation: 3,
      shadowOffset: { width: 0, height: 1 }
    },
    pickerTitleStyle: {
      color: "black",
      width:"80%",
      fontSize: 15,
      fontFamily: Custom_Fonts.Montserrat_Regular,
      marginLeft: 16,
    },
    imageStyle:
    {
        alignSelf:"center",
      width: 150,
      height: 150,
      resizeMode: "contain",
      marginLeft: 16
    }
  })
