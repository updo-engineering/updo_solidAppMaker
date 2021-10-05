import React from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";

const SignInForDetailScreen = ({props}) => {
  return (
    <SafeAreaView>
      <Text style={styles.headerTextStyle}>Saved</Text>

      <Text style={styles.descripTextStyle}>Sign in and start planning your updo: As you search, tap the hear icon to save your favorite updoers and services.</Text>
        
        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            //action
        }} >
          <Text style={styles.btnTitleStyle}>Sign In</Text>
       </TouchableOpacity>
    </SafeAreaView>

  );
}

export default SignInForDetailScreen


const styles = StyleSheet.create({
  headerTextStyle: {
    margin: 18,
    fontSize: 25,
    fontFamily:Custom_Fonts.Montserrat_Bold
  },
  btnViewStyle: {
    width:"40%",
    height: 50,
    backgroundColor: Colors.themeBlue,
    margin: 18,
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
    fontSize: 16,
    margin:18,
    fontFamily:Custom_Fonts.Montserrat_Regular
  }


});
