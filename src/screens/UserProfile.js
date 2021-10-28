import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, FlatList, Image, ScrollView } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { useSelector } from "react-redux"
import ProfileBeforeSignIn from "../screens/BeforeRegisterScreens/ProfileBeforeSignIn"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from "../Constants/Constants";
import { useDispatch } from 'react-redux'
import { SetAuth } from '../Redux/userDetail'
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'About Renae',
        index: 0
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Reviews',
        index: 1
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aaf97f63',
        title: 'Trophy Case',
        index: 1
    }
];

const UserProfile = ({ navigation }) => {
    const auth = useSelector(state => state.userReducer.auth)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()

    const [selectedIndex, setIndex] = useState(4)


     const logOut = async () => {
         await AsyncStorage.removeItem('UserDetail');
         dispatch(SetAuth(false));
        }


    const Item = ({ item, index }) => (
        <View style={{ borderRadius: 12, backgroundColor: "white", marginVertical: 15 }}>
            <View style={{ flexDirection: "row", alignSelf: "center", }}>
                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue }]} activeOpacity={0.8} onPress={() => {
                    selectedIndex === index ? setIndex(4) : setIndex(index)
                }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.btnTitleStyle}>{item.title}</Text>
                        <Image style={{ width: 20, height: 20, alignSelf: "flex-end", marginEnd: 16, resizeMode: "contain" }} source={require("../assets/downWhite.png")} />
                    </View>
                </TouchableOpacity>
            </View>
            {selectedIndex === index ?
                <View style={{
                    height: 180, backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, marginTop: -8, width: "93%", alignSelf: "center", shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
                    shadowOffset: { width: 0, height: 1 }, borderBottomEndRadius: 8, borderBottomLeftRadius: 8
                }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15 }}>{index == 0 ? user.about_me : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas velit lorem, luctus nec sodales porta, auctor sed ante. Nam porttitor libero sit amet libero porttitor, in sodales velit lacinia. In sit amet porttitor an."}</Text>

                </View> : <View />}
        </View>
    );

    return (
        auth ?
        <View style={{ backgroundColor:'white'}}>
            <ScrollView
                style={{ width: "100%", height: "100%" }}
                horizontal={false}
                scrollEventThrottle={16}
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <SafeAreaView>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
                        <View style={{
                            width: 45, height: 45, margin: 16, backgroundColor: "white", borderRadius: 23, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
                            shadowOffset: { width: 0, height: 1 }
                        }}>
                            {user.profile_pic == "" ? <Image style={{ width: 45, height: 45, resizeMode: "cover", borderRadius: 23 }} source={require(".//../assets/dummy.png")} /> : <Image style={{ width: 45, height: 45, resizeMode: "cover", borderRadius: 23 }} source={{ uri: Constants.IMG_BASE_URL + user.profile_pic }} />}
                        </View>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 21 }}>{user.name}</Text>
                        <Image style={{ width: 24, height: 24, resizeMode: "contain", position: "absolute", end: 16 }} source={require(".//../assets/editIcon.png")} />
                    </View>

                    <View style={{ flexDirection: "row", padding: 16 }}>
                        <View style={{ width: "45%", flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require(".//../assets/star.png")} />
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 15, marginHorizontal: 4 }}>4.6 (19+)</Text>
                        </View>
                        <View style={{ width: "45%", flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require(".//../assets/navPin.png")} />
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 15, marginHorizontal: 4 }}>{user.address.location}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", height: 120, justifyContent: "space-between", alignContent: "center" }}>
                        <Image style={styles.socialImgStyle} source={require("../assets/insta.png")} />
                        <Image style={styles.socialImgStyle} source={require("../assets/pinterest.png")} />
                        <Image style={styles.socialImgStyle} source={require("../assets/twitter.png")} />
                        <Image style={styles.socialImgStyle} source={require("../assets/youTube.png")} />
                    </View>

                    <FlatList
                        horizontal={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={DATA}
                        renderItem={Item}
                        keyExtractor={item => item.id}
                    />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>Account Settings</Text>
                    <TouchableOpacity onPress={() => {
                        //action
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 20 }}>Personal information</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('PaymentsScreen')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 12 }}>Payments</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                        navigation.navigate('UserProfileNotification')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 12 }}>Notification</Text>
                    </TouchableOpacity>

                    {/* <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>List Your Services</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SwitchingUpdoer')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 20 }}>Swith to Updoer</Text>
                    </TouchableOpacity> */}

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>Updo Community</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('InviteFriends')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 20 }}>Invite Friends</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ReferServiceProvider')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 12 }}>Refer a Service Provider</Text>
                    </TouchableOpacity>


                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>Support</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('HowUpdoWorks')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 20 }}>How Updo Works</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SafetyCenter')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 12 }}>Safety Center</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                        navigation.navigate('HelpScreen')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 12 }}>Get Help</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('GiveUsFeedback')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 12 }}>Give Us Feedback</Text>
                    </TouchableOpacity>

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>Legal</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('TermsScreen')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 12 }}>Terms of Service</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: "90%",
                        flexDirection: "row",
                        height: 50,
                        backgroundColor: Colors.themeBlue,
                        marginHorizontal: 25,
                        marginTop: 40,
                        marginBottom: 40,
                        borderRadius: 25,
                        justifyContent: "center"
                    }} onPress={() => {
                        logOut()
                     
                    }} >
                        <Text style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 17,
                            fontFamily: Custom_Fonts.Montserrat_SemiBold
                        }}>Sign Out</Text>
                    </TouchableOpacity>

                </SafeAreaView>
            </ScrollView></View> : <ProfileBeforeSignIn navigation={navigation} />
    );
}




export default UserProfile



const styles = StyleSheet.create({

    socialImgStyle: {
        alignSelf: "center",
        resizeMode: "contain",
        width: "22%",
        height: 80
    },
    btnViewStyle: {
        height: 50,
        width: "93%",
        borderRadius: 12,
        justifyContent: "center", elevation: 3,
        shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
        shadowOffset: { width: 0, height: 1 }
    },
    btnTitleStyle: {
        marginHorizontal: 16,
        color: "white",
        fontSize: 14,
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
});
