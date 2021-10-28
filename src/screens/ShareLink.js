import React,{useState} from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity,Linking,Clipboard} from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";

const ShareLink = (props) => {
let sharelink = props.route.params.deepLink
    return (
        <SafeAreaView>
        <TopHeaderView title = "Share your link"/>

        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            Clipboard.setString(sharelink)
            Toast.show('Link Copied..')
        }} >
          <Text style={styles.btnTitleStyle}>Copy link</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
             const operator = Platform.select({ios: '&', android: '?'});
             Linking.openURL(`sms:${operator}body=${sharelink}`);
        }} >
          <Text style={styles.btnTitleStyle}>SMS</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
             Linking.openURL('mailto:?subject=Invite&body='+{sharelink})
        }} >
          <Text style={styles.btnTitleStyle}>Email</Text>
       </TouchableOpacity>
        </SafeAreaView>
    );
  }
  
  export default ShareLink
  
  
  const styles = StyleSheet.create({
    btnViewStyle: {
        width:"90%",
        flexDirection:"row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical:8,
        borderRadius: 25,
        justifyContent: "center"
      },
      btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 17,
        fontFamily:Custom_Fonts.Montserrat_SemiBold
      }
  });
  