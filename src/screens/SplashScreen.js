import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux"

const SplashScreen = ({ navigation }) => {
  const auth = useSelector(state => state.userReducer.auth)

  useEffect(() => {
    setTimeout(() => {
      auth ?
      navigation.replace('TabNavStack') : navigation.replace('SignInScreen')
    }, 3000);
  }, []);
  return (
    <View style={styles.imageBackground}>
      <Image style={styles.imageStyle} source={require("../assets/logo.png")}></Image>
    </View>
  );
}

export default SplashScreen


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  imageStyle:
  {
    width: "42%",
    height: "42%",
    resizeMode: "contain"
  }

});

