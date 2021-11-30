import React, { useState, useEffect } from "react";
import { Text, ScrollView, Dimensions, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
const { width, height } = Dimensions.get('window');
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "./TopHeader/TopHeaderView";


const LearnMore = ({ navigation }) => {


    return (

        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Learn More" />


                <View style={styles.itemViewStyle}>
                    <Text style={{ fontSize: 22, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 30 }} >We’re here to help.</Text>
                    <Image style={{ width: 200, height: 200, alignSelf: "center", marginVertical: 30 }} source={require("../assets/searchGrad.png")}></Image>
                    <Text style={{ fontSize: 16, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 20, marginBottom: 40 }} >Scheduling services for someone else? Whether you’re an administrative professional or a caretaker, TipTop is here to help your folks find services too.{'\n\n'}From hair and nails, to eyebrows and even pet grooming, the TipTop Community has a diverse set
                        of skills!</Text>
                </View>


                <View style={styles.itemViewStyle}>
                    <Text style={{ fontSize: 22, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 30 }} >Confirm your booking,
                        around your time</Text>
                    <Text style={{ fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 20, marginTop: 16 }} >TipTop is built around your team’s schedule. Book when it’s most convenient for you and your folks!</Text>
                    <Image style={{ width: 200, height: 200, alignSelf: "center", marginVertical: 30 }} source={require("../assets/calGrad.png")}></Image>
                </View>


                <View style={styles.itemViewStyle}>
                    <Text style={{ fontSize: 22, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 30 }} >Personalization for all.</Text>
                    <Image style={{ width: 250, height: 200, alignSelf: "center", marginVertical: 30 }} source={require("../assets/gradUsers.png")}></Image>
                    <Text style={{ fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 20, marginBottom: 20 }} >Communicate with your TipTopper to ensure you’re finding what you need. The TipTopper will then put together a proposal that’s right for you. </Text>
                </View>

                <View style={styles.itemViewStyle}>
                    <Text style={{ fontSize: 22, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 30 }} >{'Safe & Secure.'}</Text>
                    <Image style={{ width: 200, height: 200, alignSelf: "center", marginVertical: 30}} source={require("../assets/gradCheck.png")}></Image>
                    <Text style={{ fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 20, marginBottom: 20 }} >TipTop is a safe community, we keep your information private.{'\n\n'}
TipTop is partnered with Stripe, the world’s leading payments platform, to provide a secure environment for transactions.{'\n\n'}
All payments must be on one card, however if you need to split the charge we encourage you to leverage payment options like Zelle, Venmo and more! </Text>
                </View>



            </SafeAreaView>
        </ScrollView>
    );
}

export default LearnMore





const styles = StyleSheet.create({

    pickerStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        marginTop: 20,
        borderColor: "black",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    pickerTitleStyle: {
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Regular,
        marginLeft: 16,
    },
    boldTextStyle: {
        fontSize: 24,
        fontFamily: Custom_Fonts.Montserrat_Bold,
        marginHorizontal: 16,
        marginTop: 50

    },
    btnViewStyle: {
        height: 50,
        width: "93%",
        marginVertical: 12,
        borderRadius: 12,
        justifyContent: "center"
    },
    btnExploreStyle: {
        width: "35%",
        height: 40,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        justifyContent: "center",
        marginBottom: 40
    }
    ,
    btnTitleStyle: {
        marginHorizontal: 16,
        color: "white",
        fontSize: 14,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    ratingViewStyle: {
        width: "35%",
        height: 32,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        marginTop: 16,
        justifyContent: "center"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 8,
        minWidth: 150,
        height: 80,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        marginEnd: 16,
        color: "white",
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
    itemViewStyle: {
        backgroundColor: "white",
        borderRadius: 16,
        marginVertical: 20,
        marginHorizontal: 12,
        shadowColor: "black",
        shadowOpacity: 0.4,
        elevation: 6,
        shadowOffset: { width: 0, height: 1 }
    },

});
