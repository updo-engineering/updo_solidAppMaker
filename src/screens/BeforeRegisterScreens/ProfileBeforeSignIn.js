import React from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";

const ProfileBeforeSignIn = () => {
  return (
    <SafeAreaView>
      <Text style={styles.headerTextStyle}>Your profile</Text>

      <Text style={styles.descripTextStyle}>Sign in to start planning your next Updo.</Text>
        
        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            //action
        }} >
          <Text style={styles.btnTitleStyle}>Sign In</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            //action
        }} >
          <Text style={styles.btnTitleStyle}>Sign Up</Text>
       </TouchableOpacity>


       <Text style={styles.underLineTextStyle}>Interested in being an Updoer?</Text>

    </SafeAreaView>

  );
}

export default ProfileBeforeSignIn


const styles = StyleSheet.create({
  headerTextStyle: {
    margin: 18,
    fontSize: 25,
    fontFamily:Custom_Fonts.Montserrat_Bold
  },
  btnViewStyle: {
    width:"90%",
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
  },
  underLineTextStyle: {
    fontSize: 16,
    margin:18,
    fontFamily:Custom_Fonts.Montserrat_SemiBold,
    textDecorationLine:"underline"
  }

});
