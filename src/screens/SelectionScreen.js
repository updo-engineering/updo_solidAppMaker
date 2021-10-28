import React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity ,Dimensions} from "react-native";
import {Custom_Fonts} from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const { width, height } = Dimensions.get('window');
import { SetType } from '../Redux/userDetail'
import { useDispatch } from 'react-redux'

const SelectionScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView>
      <View style = {{backgroundColor:"white",height}}>
      <Text style={styles.headerTextStyle}>How do you Updo?</Text>

      <View style={{ justifyContent: "center", height: "80%" }}>
        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
          dispatch(SetType('Customer'));
          navigation.navigate('TabNavigator')
        }} >
          <Text style={styles.btnTitleStyle}>Find Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
         dispatch(SetType('Service'));
         navigation.navigate('TabNavigator')
        }} >
          <Text style={styles.btnTitleStyle}>Provide Services</Text>
        </TouchableOpacity>

        <Text style={styles.descripTextStyle}>Don’t worry,{"\n"}You can have always access to both later.</Text>
      </View>
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
