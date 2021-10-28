import React from "react";
import { Text,  StyleSheet, } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../TopHeader/TopHeaderView"

const CreditsScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <TopHeaderView title="Credits & coupons" />
           <Text style = {styles.titleStyle}>Invite friends for more credit</Text>
        </SafeAreaView>
    )
}

export default CreditsScreen

const styles = StyleSheet.create({
    titleStyle: {
        margin: 20,
        fontFamily: Custom_Fonts.Montserrat_SemiBold,
        fontSize: 17,
        color:Colors.themeBlue,
        textDecorationLine:"underline"
    }

});