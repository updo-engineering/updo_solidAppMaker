import React,{useState} from "react";
import { Text, StyleSheet, SafeAreaView,TouchableOpacity,Image,View,Linking,Clipboard} from "react-native";
import { Custom_Fonts } from "../Constants/Font";

import { Colors } from "../Colors/Colors"
import TopHeaderView from "./TopHeader/TopHeaderView";
import Toast from 'react-native-simple-toast';

const InviteFriends = ({navigation}) => {
   let inviteLink = "https://updo.page.link/Invite"
    return (
        <SafeAreaView>
        <TopHeaderView title = "Invite your friends"/>
        <Text style={{ fontSize: 17, marginLeft:18,fontFamily:Custom_Fonts.Montserrat_Bold}}>Share the gift of Updo!</Text>
        <Text style={{ fontSize: 15, marginLeft:18,fontFamily:Custom_Fonts.Montserrat_Regular,marginTop:20,marginBottom:40}}>Share your link with friends new to Updo.</Text>

        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            Clipboard.setString('https://updo.page.link/Invite')
            Toast.show('Link Copied..')
        }} >
          <Text style={styles.btnTitleStyle}>Copy link</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
             const operator = Platform.select({ios: '&', android: '?'});
             Linking.openURL(`sms:${operator}body=${'https://updo.page.link/Invite'}`);
        }} >
          <Text style={styles.btnTitleStyle}>SMS</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
           Linking.openURL('mailto:?subject=Invite&body=https://updo.page.link/Invite')
        }} >
          <Text style={styles.btnTitleStyle}>Email</Text>
       </TouchableOpacity>

       <View style = {styles.itemViewStyle}>
       <Image style={{alignSelf:'center',width:280,height:280}} source = {require("../assets/invite.png")}/>
       <TouchableOpacity style={[styles.btnViewStyle,{backgroundColor:'white',width:'70%',marginTop:-60,height:44,marginBottom:20}]} onPress={() => {
           navigation.navigate('ReferServiceProvider')
        }} >
          <Text style={[styles.btnTitleStyle,{color:Colors.themeBlue, fontFamily:Custom_Fonts.Montserrat_SemiBold }]}>Refer a Service Provider</Text>
       </TouchableOpacity>
       </View>

        </SafeAreaView>
    );
  }
  
  export default InviteFriends
  
  
  const styles = StyleSheet.create({
    btnViewStyle: {
        width:"90%",
        flexDirection:"row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical:8,
        borderRadius: 25,
        justifyContent: "center",
        elevation: 3,
        shadowColor: "grey",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 1 }
      },
      btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontFamily:Custom_Fonts.Montserrat_Medium
      },
      itemViewStyle: {
        width: "90%",
        backgroundColor: Colors.themeBlue,
        alignItems: "center",
        borderRadius: 16,
        marginVertical: 40,
        marginHorizontal: 16,
        shadowColor: "grey",
        shadowOpacity: 0.4,
        elevation: 3,
        overflow:"hidden",
        shadowOffset: { width: 0, height: 1 }
    },
  
  });
  