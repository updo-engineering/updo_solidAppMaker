import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, View } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useSelector } from "react-redux"
import dynamicLinks from '@react-native-firebase/dynamic-links';

const ReferServiceProvider = ({ navigation }) => {
    const user = useSelector(state => state.userReducer.user)
    

    async function buildLink() {
        const link = await dynamicLinks().buildLink({
          link: "https://jointiptop.page.link/?referral=" + user.ref_code,
          domainUriPrefix: 'https://jointiptop.page.link/',
          // navigation:'hieeeh',
          android: { packageName: 'com.jointiptop' },
          ios: { fallbackUrl: "", bundleId: "com.jointiptop" }
        });
        navigation.navigate('ShareLink',{deepLink:link})
        return link;
      }

    return (
        <SafeAreaView>
            <TopHeaderView title="Refer a service provider" />

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginLeft: 20, fontSize: 15, width: "70%" }}>Refer a service provider to join the TipTop community!</Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, margin: 20, fontSize: 15 }}>Know any amazing, talented service providers who would be a great fit with TipTop? We can’t wait to meet them!</Text>

            <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                buildLink()
               
            }} >
                <Text style={styles.btnTitleStyle}>Share your link</Text>
            </TouchableOpacity>



        </SafeAreaView>
    );
}

export default ReferServiceProvider


const styles = StyleSheet.create({
    btnViewStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical: 40,
        borderRadius: 25,
        justifyContent: "center",elevation: 3,
        shadowColor: "grey",
        shadowOpacity: 0.4,
        elevation: 3,
        shadowOffset: { width: 0, height: 1 }
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        marginHorizontal: 12,
        fontFamily: Custom_Fonts.Montserrat_Medium
    },
    ratingViewStyle: {
        height: 30,
        backgroundColor: Colors.themeBlue,
        borderRadius: 8,
        justifyContent: "center",
        alignSelf: "center",
        position: "absolute",
        end: 40
    },
    itemViewStyle: {
        width: "90%",
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 16,
        height: 55,
        marginVertical: 12,
        marginHorizontal: 16,
        shadowColor: "grey",
        shadowOpacity: 0.4,
        elevation: 3,
        shadowOffset: { width: 0, height: 1 }
    },
});
