import React, { useEffect } from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux"

const SplashScreen = ({ navigation }) => {
  const auth = useSelector(state => state.userReducer.auth)

  useEffect(() => {
    setTimeout(() => {
      auth ?
      navigation.navigate('TabNavigator') : navigation.navigate('SelectionScreen')
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

