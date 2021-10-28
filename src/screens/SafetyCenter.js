import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Pressable } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
const SafetyCenter = ({navigation}) => {

    return (
        <SafeAreaView>
            <TopHeaderView title="Safety Center" />

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, marginLeft: 20, fontSize: 22 }}>Your Safety is Our Priority</Text>

            <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
               Linking.openURL(`tel:${911}`)
            }} >
                <Text style={styles.btnTitleStyle}>Call local emergency services </Text>
            </TouchableOpacity>

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, marginLeft: 20, fontSize: 15 }}>If this is an emergency, please call your local emergency services. </Text>

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginHorizontal: 20, fontSize: 15, marginTop: 60 }}>Learn about Updo Trust & Safety</Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, marginHorizontal: 20, fontSize: 15, marginTop: 20 }}>
                <Text>Every day our Updo Community continues to grow, with clients and beauty professionals of all kinds coming together.{"\n\n"}
                    You know what’s at the foundation of this community? Trust.{"\n\n"}
                    We’re here for you! Reach out if you have any questions: </Text>

                    <Text 
                    onPress = {() => Linking.openURL('http://support@updo.co')}
                    style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, color: Colors.themeBlue}}>support@updo.co</Text>
            </Text>

        </SafeAreaView>
    );
}

export default SafetyCenter

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        backgroundColor: "#F0B752",
        marginHorizontal: 18,
        marginVertical: 40,
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
