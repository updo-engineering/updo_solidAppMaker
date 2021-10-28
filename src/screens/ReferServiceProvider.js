import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, View } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useSelector } from "react-redux"
import dynamicLinks from '@react-native-firebase/dynamic-links';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Your earnings',
        index: 0
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'How referrals work',
        index: 1
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
        title: 'Read terms and conditions',
        index: 1
    }
];

const ReferServiceProvider = ({ navigation }) => {
    const user = useSelector(state => state.userReducer.user)
    

    async function buildLink(id) {
        const link = await dynamicLinks().buildLink({
          link: "https://updo.page.link/provider/?id=" + id,
          domainUriPrefix: 'https://updo.page.link/',
          // navigation:'hieeeh',
          android: { packageName: 'com.updo' },
          ios: { fallbackUrl: "", bundleId: "com.updo" }
        });
        navigation.navigate('ShareLink',{deepLink:link})
        return link;
      }

    const Item = ({ item, index }) => (
        <TouchableOpacity style={{ height: 60, padding: 16 }} onPress={() => {
            switch (index) {
                case 0:
                    navigation.navigate('EarningScreen')
                    break;
                case 1:
                    navigation.navigate('HowReferWorks')
                    break;
                case 2:
                    navigation.navigate('TermsScreen')
                    break;
                default:
                    break;
            }

        }} >

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15 }}>{item.title}</Text>
            <View style={{ height: 1, backgroundColor: Colors.greyColor, marginVertical: 15 }}></View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView>
            <TopHeaderView title="Refer a service provider" />

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginLeft: 20, fontSize: 15, width: "70%" }}>Refer a service provider to join the Updo community!</Text>

            <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                buildLink(user._id)
               
            }} >
                <Text style={styles.btnTitleStyle}>Share your link</Text>
            </TouchableOpacity>
{/* 
            <FlatList
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={Item}
                keyExtractor={item => item.id}
            /> */}

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
        justifyContent: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        marginHorizontal: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
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
