import React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import {Custom_Fonts} from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const SelectionScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text style={styles.headerTextStyle}>How do you Updo?</Text>

      <View style={{ justifyContent: "center", height: "80%" }}>
        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
          //action
        }} >
          <Text style={styles.btnTitleStyle}>Find Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
     //     navigation.navigate('HomeTabScreen')
        }} >
          <Text style={styles.btnTitleStyle}>Provide Services</Text>
        </TouchableOpacity>

        <Text style={styles.descripTextStyle}>Don’t worry,{"\n"}You can have always access to both later.</Text>
      </View>

    </SafeAreaView>

  );
}

export default SelectionScreen


const styles = StyleSheet.create({
  headerTextStyle: {
    margin: 20,
    fontSize: 25,
    fontFamily:Custom_Fonts.Montserrat_Bold
  },
  btnViewStyle: {
    height: 50,
    backgroundColor: Colors.themeBlue,
    margin: 12,
    borderRadius: 25,
    justifyContent: "center"
  }
  ,
  btnTitleStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 17,
    fontFamily:Custom_Fonts.Montserrat_SemiBold
  },
  descripTextStyle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily:Custom_Fonts.Montserrat_Regular
  }


});
