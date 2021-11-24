import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, FlatList, Image, ScrollView, Linking, Dimensions } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { useSelector } from "react-redux"
import ProfileBeforeSignIn from "../screens/BeforeRegisterScreens/ProfileBeforeSignIn"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from "../Constants/Constants";
import { useDispatch } from 'react-redux'
import { SetAuth } from '../Redux/userDetail'
import { getUserReviews, getProviderDetail } from "../apiSauce/HttpInteractor";
import { useFocusEffect } from '@react-navigation/native';
import moment from "moment";
import Toast from 'react-native-simple-toast';
const { width, height } = Dimensions.get('window');

const DATA = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const UserProfile = ({ navigation }) => {
    const auth = useSelector(state => state.userReducer.auth)
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    const dispatch = useDispatch()
    const [selectedIndex, setIndex] = useState(4)

    const logOut = async () => {
        await AsyncStorage.removeItem('UserDetail');
        dispatch(SetAuth(false));
    }

    const ReviewItem = ({ item, index }) => {
        return (
            <View style={{ borderColor: "grey", borderLeftWidth: 0.2, borderTopWidth: 0.2, width: (width * 0.73) / 8, height: 30, backgroundColor: '#00A8E0', opacity: item, borderBottomLeftRadius: index == 0 ? 16 : 0 }} />
        );
    }

    return (
        auth ?
            <View style={{ backgroundColor: 'white' }}>
                <ScrollView
                    style={{ width: "100%", height: "100%" }}
                    horizontal={false}
                    scrollEventThrottle={16}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <SafeAreaView>
                        <View style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, elevation: 3, marginTop: -8, marginHorizontal: -4, overflow: 'hidden' }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
                                <View style={{
                                    width: 76, height: 76, margin: 16, backgroundColor: "white", borderRadius: 38, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3,
                                    shadowOffset: { width: 0, height: 1 }
                                }}>
                                    <Image style={{ width: 76, height: 76, resizeMode: "cover", borderRadius: 38 }} source={user.profile_pic == "" ? require(".//../assets/dummy.png") : { uri: Constants.IMG_BASE_URL + user.profile_pic }} />
                                </View>
                                <View>
                                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 24 }}>{user.name}</Text>
                                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 15 }}>Since {moment.unix(user.created_on).format('yyyy')}</Text>
                                </View>
                                <Image style={{ width: 24, height: 24, resizeMode: "contain", position: "absolute", end: 16, top: 20 }} source={require(".//../assets/editIcon.png")} />
                            </View>
                            <View style={{ height: 30, width: '100%', overflow: 'hidden', flexDirection: 'row', marginBottom: 3 }}>
                                <FlatList
                                    style={{ width: '78%' }}
                                    horizontal={true}
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={DATA}
                                    renderItem={ReviewItem}
                                    keyExtractor={item => item.id}
                                />

                                <View style={{ width: '28%', borderColor: '#03409D', borderWidth: 1, height: 30, borderBottomRightRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: "#03409D", fontSize: 10 }}>TipTop Rewards</Text>
                                </View>
                            </View>

                        </View>


                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>Account Settings</Text>

                        <TouchableOpacity onPress={() => {
                            //action
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 20 }}>My TipTop Rewards</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            //action
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>My Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            //action
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Personal information</Text>
                        </TouchableOpacity>

                        {user.userType == 'Customer' ? <TouchableOpacity onPress={() => {
                            navigation.navigate('PaymentsScreen')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Payments</Text>
                        </TouchableOpacity> : null}



                        <TouchableOpacity onPress={() => {
                            navigation.navigate('UserProfileNotification')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Notification</Text>
                        </TouchableOpacity>
                        {user.userType == 'Customer' ?
                            <View>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>List Your Services</Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('SwitchingUpdoer')
                                }} >
                                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 20 }}>Start your TipTop Journey</Text>
                                </TouchableOpacity>
                            </View> : null}

                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>TipTop Community</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('InviteFriends')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 20 }}>Invite Friends</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ReferServiceProvider')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Refer a Service Provider</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate('TipTopPodcast')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>The TipTop Podcast</Text>
                        </TouchableOpacity>
                        {user.userType == 'Customer' ? null :
                        <TouchableOpacity onPress={() => {
                           // navigation.navigate('TipTopPodcast')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Grow your Brand</Text>
                        </TouchableOpacity>}

                        <TouchableOpacity onPress={() => {
                            navigation.navigate('FollowTipTop')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Follow TipTop </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate('PartnerWithUs')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Partner with Us</Text>
                        </TouchableOpacity>


                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>Support</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('HowUpdoWorks')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 20 }}>How TipTop Works</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SafetyCenter')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Safety Center</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            navigation.navigate('HelpScreen')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Here to Help</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            // navigation.navigate('GiveUsFeedback')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>FAQ</Text>
                        </TouchableOpacity>

                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 30 }}>Legal</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('TermsScreen')
                        }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 16 }}>Terms of Service</Text>
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
                            justifyContent: "center",
                            elevation: 3,
                            shadowColor: "grey",
                            shadowOpacity: 0.4,
                            shadowOffset: { width: 0, height: 1 }
                        }} onPress={() => {
                            logOut()

                        }} >
                            <Text style={{
                                alignSelf: "center",
                                color: "white",
                                fontSize: 16,
                                fontFamily: Custom_Fonts.Montserrat_Medium
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
        width: width * 0.25,
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
