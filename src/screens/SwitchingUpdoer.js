import React, { useEffect } from "react";
import { ImageBackground, Image, StyleSheet,Text } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
const SwitchingUpdoer = ({navigation}) => {

  return (
    <ImageBackground style={styles.imageBackground} source={require("../assets/bg.png")}>
      <Image style={styles.imageStyle} source={require("../assets/logo.png")}></Image>
      <Text style={{ fontSize: 17, marginLeft:18,fontFamily:Custom_Fonts.Montserrat_Medium,color:"white"}}>Switching to Tiptopper</Text>

    </ImageBackground>
  );
}

export default SwitchingUpdoer


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle:
  {
    width: "30%",
    height: "12%",
    resizeMode: "contain",
  }

});

