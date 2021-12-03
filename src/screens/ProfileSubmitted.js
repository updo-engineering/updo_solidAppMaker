import React, { useEffect } from "react";
import { Image, StyleSheet,View,Text } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
const ProfileSubmitted = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignInScreen')
    }, 5000);
  }, []);
  return (
      <View style = {{justifyContent:"center",alignContent:"center",height:"100%"}}>
      <View style = {styles.pickerStyle}>
      <Image style={{ alignSelf: 'center', width: 130, height: 130, resizeMode: 'cover', marginTop: 8 }} source={require('../assets/logoBlue.png')} />
     <Text style={{ fontSize: 17, marginHorizontal: 18,textAlign:"center", fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 0 }}>You have successfully registered with TipTop</Text>
     <Text style={{ fontSize: 14, marginHorizontal: 18,textAlign:"center",fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 12 }}>We have sent a link to complete your payment set up.{'\n'}Please complete it to use Tiptop seamlessly.</Text>

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
