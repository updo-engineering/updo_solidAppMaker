import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Image,View } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";

const GiveUsFeedback = ({navigation}) => {

    return (
        <View style={{width: '100%', height: '100%',backgroundColor: 'white'}}>

        <SafeAreaView>
            <TopHeaderView title="Here to Help" />

            <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            navigation.navigate('ProductFeedBack')
        }} >
          <Text style={styles.btnTitleStyle}>Give product feedback</Text>
          <Image style={{ resizeMode: "contain", width: 16, height: 16,alignSelf: "center",marginRight:25}} source={require("../assets/rightArrow.png")}></Image>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            navigation.navigate('ReportBug')
        }} >
          <Text style={styles.btnTitleStyle}>Report a bug</Text>
          <Image style={{ resizeMode: "contain", width: 16, height: 16,alignSelf: "center",marginRight:25}} source={require("../assets/rightArrow.png")}></Image>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
           navigation.navigate('ContactSupport')
        }} >
          <Text style={styles.btnTitleStyle}>Contact Support</Text>
          <Image style={{ resizeMode: "contain", width: 16, height: 16,alignSelf: "center",marginRight:25}} source={require("../assets/rightArrow.png")}></Image>
       </TouchableOpacity>

        </SafeAreaView>
        </View>
    );
}

export default GiveUsFeedback

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        height: 80,
        borderRadius: 25,
        borderBottomWidth:1,
        borderBottomColor:'rgba(0, 0, 0, 0.2)'
    },
    btnTitleStyle: {
        color: "black",
        fontSize: 16,
        alignSelf:'center',
        marginHorizontal: 20,
        fontFamily: Custom_Fonts.Montserrat_Medium
    }
});
