import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";

const GiveUsFeedback = ({navigation}) => {

    return (
        <SafeAreaView>
            <TopHeaderView title="Give Us Feedback" />
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, marginHorizontal: 20, fontSize: 15, marginTop: 8,marginBottom:40 }}>
                <Text>If this is a support request outside of feedback or product-related issues, please </Text>
                <TouchableOpacity onPress={() => navigation.navigate('ContactSupport')}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, color: Colors.themeBlue }}>Contact Support.</Text>

                </TouchableOpacity>
            </Text>

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
    );
}

export default GiveUsFeedback

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical: 22,
        borderRadius: 25,
        justifyContent: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        marginHorizontal: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    }
});
