import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, View } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
const SafetyCenter = ({navigation}) => {

    return (
        <View style={{width: '100%', height: '100%',backgroundColor: 'white'}}>

        <SafeAreaView>
            <TopHeaderView title="Safety Center" />

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginLeft: 20, fontSize: 17 }}>Your Safety is Our Priority</Text>

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, margin: 20, fontSize: 15 }}>If this is an emergency, please call your local emergency services. </Text>

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginHorizontal: 20, fontSize: 17, marginTop: 30 }}>Learn about Tiptop Trust & Safety</Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, marginHorizontal: 20, fontSize: 15, marginTop: 20 }}>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15 }}>Every day our Tiptop Community continues to grow, with clients and beauty professionals of all kinds coming together.{"\n\n"}
                    You know what’s at the foundation of this community? Trust.{"\n\n"}
                    We’re here for you! Reach out if you have any questions: </Text>
                    <Text 
                    onPress = {() =>  Linking.openURL('mailto:safety@jointiptop.com?subject=Note to TipTop Safety Team&body=')}
                    style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, color: Colors.themeBlue}}>safety@jointiptop.com</Text>
            </Text>

        </SafeAreaView>
        </View>
    );
}

export default SafetyCenter

