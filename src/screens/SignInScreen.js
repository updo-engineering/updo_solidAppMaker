import React from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity,Image,TextInput,View } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";

const SignInScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.headerTextStyle}>Sign in or sign up</Text>
      
      <TouchableOpacity style={styles.pickerStyle} onPress={() => {
            //action
        }} >
          <Text style={styles.pickerTitleStyle}>United States (+1)</Text>
          <Image style= {{marginEnd:20}} source = {require("../assets/down.png")}/>
       </TouchableOpacity>
      
       <View style={styles.pickerStyle}>
          <TextInput style={styles.pickerTitleStyle} placeholder="Phone number" keyboardType="number-pad"></TextInput>
       </View>

      <Text style={styles.descripTextStyle}>We’ll call or text to confirm your number. Standard message and data rates apply.</Text>
        
        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            //action
        }} >
          <Text style={styles.btnTitleStyle}>Continue</Text>
       </TouchableOpacity>

     <View style = {{flexDirection:"row",marginTop:30,height:120,justifyContent:"center",alignContent:"center"}}>

     <Text style={styles.semiBoldTitle}>Continue with </Text>

     <Image style = {{alignSelf:"center"}} source={require("../assets/google.png")}/>
     <Image style = {{alignSelf:"center",marginLeft:-16}} source={require("../assets/google.png")}/>
     </View>


    </SafeAreaView>

  );
}

export default SignInScreen


const styles = StyleSheet.create({
  headerTextStyle: {
    margin: 18,
    fontSize: 25,
    fontFamily:Custom_Fonts.Montserrat_Bold
  },
  btnViewStyle: {
    width:"90%",
    flexDirection:"row",
    height: 50,
    backgroundColor: Colors.themeBlue,
    margin: 18,
    borderRadius: 25,
    justifyContent: "center"
  },
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
  pickerStyle: {
    width:"90%",
    flexDirection:"row",
    height: 50,
    margin: 18,
    borderColor:"black",
    borderWidth:1,
    borderRadius: 25,
    alignContent:"center",
    alignItems:"center",
    justifyContent:"space-between"
  },
  pickerTitleStyle: {
    color: "black",
    fontSize: 15,
    fontFamily:Custom_Fonts.Montserrat_Regular,
    marginLeft:16
  },
  semiBoldTitle: {
    color: "black",
    fontSize: 17,
    fontFamily:Custom_Fonts.Montserrat_SemiBold,
    marginLeft:16,
    alignSelf:"center"
  },


});
