import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking,View } from "react-native";
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
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            navigation.navigate('ReportBug')
        }} >
          <Text style={styles.btnTitleStyle}>Report a bug</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
           navigation.navigate('ContactSupport')
        }} >
          <Text style={styles.btnTitleStyle}>Contact Support</Text>
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
        height: 50,
        marginVertical: 22,
        borderRadius: 25,
        borderBottomWidth:1,
        borderBottomColor:'rgba(0, 0, 0, 0.2)'
    },
    btnTitleStyle: {
        color: "black",
        fontSize: 16,
        marginHorizontal: 20,
        fontFamily: Custom_Fonts.Montserrat_Medium
    }
});
