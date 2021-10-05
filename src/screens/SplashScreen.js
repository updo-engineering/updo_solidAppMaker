import React, { useEffect } from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SelectionScreen')
    }, 3000);
  }, []);
  return (
    <ImageBackground style={styles.imageBackground} source={require("../assets/bg.png")}>
      <Image style={styles.imageStyle} source={require("../assets/logo.png")}></Image>
    </ImageBackground>
  );
}

export default SplashScreen


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle:
  {
    width: "30%",
    height: "30%",
    resizeMode: "contain"
  }

});

