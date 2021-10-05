import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";

//import { useNavigation } from '@react-navigation/native';
const HeaderView = (props) => {
 // const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row",marginBottom:25}}>
      <TouchableOpacity onPress={() => {
       // navigation.goBack();
      }} >
        <Image style={styles.imageStyle} source={require("../../assets/backBtn.png")} />
      </TouchableOpacity>
      <Text style={{ height: 24, marginTop: 16, fontFamily:Custom_Fonts.Montserrat_Bold,fontSize:20}}>{props.title}</Text>
    </View>
  );
}

export default HeaderView

const styles = StyleSheet.create({
  imageStyle:
  {
    width: 24,
    height: 24,
    resizeMode: "contain",
    margin: 16
  }

});