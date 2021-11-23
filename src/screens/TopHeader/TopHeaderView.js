import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";

import { useNavigation } from '@react-navigation/native';
const TopHeaderView = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row",marginBottom:25}}>
      <TouchableOpacity onPress={() => {
        navigation.goBack();
      }} >
        <Image style={styles.imageStyle} source={require("../../assets/backBtn.png")} />
      </TouchableOpacity>
      <Text style={{ marginTop: 16, fontFamily:Custom_Fonts.Montserrat_SemiBold,fontSize:20}}>{props.title}</Text>
    </View>
  );
}

export default TopHeaderView

const styles = StyleSheet.create({
  imageStyle:
  {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginHorizontal: 16,marginTop:20
  }

});