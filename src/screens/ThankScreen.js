import React, { useEffect } from "react";
import { Image, StyleSheet,View } from "react-native";

const ThankScreen = ( ) => {
  return (
      <View style = {{justifyContent:"center",alignContent:"center",height:"100%"}}>
      <Image style={styles.imageStyle} source={require("../../src/assets/thanksDialog.png")}/>
      </View>
  );
}

export default ThankScreen


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageStyle:
  {
    resizeMode: "contain",
    width:"100%"
  }

});

