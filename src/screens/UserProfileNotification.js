import React, { useState } from "react";
import { Text, ScrollView, View, toggleSwitch, Switch, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../screens/TopHeader/TopHeaderView"
import { Colors } from "../Colors/Colors";
import { updateNotificationSetting } from "../apiSauce/HttpInteractor";
import { useSelector,useDispatch } from "react-redux"
import Toast from 'react-native-simple-toast';
import _ from 'lodash'
import {SetUser } from '../Redux/userDetail'
import Loader from '../Components/loader'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileNotification = ({ navigation }) => {
    const token = useSelector(state => state.userReducer.token)
    const user = useSelector(state => state.userReducer.user)
    const ref = useSelector(state => state.userReducer.ref)
    let dataC = _.cloneDeep(user?.noti_settings)
    const [data, setData] = useState(dataC)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const storeData = async value => {
        console.log(">>>>>", value)
        setLoading(true);
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('UserDetail', jsonValue);
            dispatch(SetUser(value.user));
            setTimeout(() => {
                navigation.goBack()
            }, 1200);
        } catch (e) {
            Toast.show(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Notifications" />
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginTop: 16 }}>A Note from the TipTop Team:</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginBottom: 16, marginTop: 12 }}>In order to maximize your TipTop experience, we encourage you to maintain communication with everyone across the TipTop Community!</Text>

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginTop: 16 }}>Messages</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginBottom: 16, marginTop: 4 }}>Receive messages from TipToppers and clients. This includes service requests.</Text>

                    <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Email</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.messages.email = (data?.messages.email == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.messages.email == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.messages.sms = (data?.messages.sms == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.messages.sms == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.messages.push = (data?.messages.push == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.messages.push == 1}
                        />
                    </View>


                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginTop: 40 }}>Reminders</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginBottom: 16, marginTop: 4 }}>Receive appointment reminders, requests to complete payments and reviews, and other news related to your activites on TipTop.</Text>

                    <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Email</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.reminders.email = (data?.reminders.email == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.reminders.email == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.reminders.sms = (data?.reminders.sms == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.reminders.sms == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.reminders.push = (data?.reminders.push == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.reminders.push == 1}
                        />
                    </View>


                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginTop: 40 }}>TipTop Community</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginBottom: 16, marginTop: 4 }}>Receive news and updates for all-things TipTop, including promotions, new service announcements, and messages from senior leadership at TipTop!</Text>

                    <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Email</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.community.email = (data?.community.email == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.community.email == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.community.sms = (data?.community.sms == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.community.sms == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.community.push = (data?.community.push == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.community.push == 1}
                        />
                    </View>

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginTop: 40 }}>Account Support</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginBottom: 16, marginTop: 4 }}>Receive updates on your account, your appointments, security and privacy updates, and customer support. For your security, you cannot disable email notifications and TipTop support may contact you via phone if needed.</Text>

                    <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Email</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.acc_support.email = (data?.acc_support.email == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.acc_support.email == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.acc_support.sms = (data?.acc_support.sms == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.acc_support.sms == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.acc_support.push = (data?.acc_support.push == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.acc_support.push == 1}
                        />
                    </View>

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginTop: 40 }}>Policy & Security</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginBottom: 16, marginTop: 4 }}>Receive important updates on TipTop’s policies and security, including regulations and other announcements regarding our commitment to creating a safe and open TipTop Community!</Text>

                    <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Email</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.policy_security.email = (data?.policy_security.email == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.policy_security.email == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.policy_security.sms = (data?.policy_security.sms == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.policy_security.sms == 1}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={() => {
                                data.policy_security.push = (data?.policy_security.push == 1 ? 0 : 1)
                                setData({ ...data })
                            }}
                            value={data?.policy_security.push == 1}
                        />
                    </View>


                    <TouchableOpacity style={{
                        width: "98%",
                        flexDirection: "row",
                        height: 50,
                        backgroundColor: Colors.themeBlue,
                        marginHorizontal: 20,
                        marginTop: 25,
                        marginBottom: 25,
                        borderRadius: 25,
                        alignSelf: 'center',
                        justifyContent: "center",
                        elevation: 3,
                        shadowColor: "grey",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 1 }
                    }} onPress={() => {
                        updateNotificationSetting(user.user_type == 'Customer', token, JSON.stringify(data)).then(response => {
                            if (response.ok) {
                                if (response.data?.status === true) {
                                    Toast.show(response.data?.message)
                                    storeData({ user: response.data?.data, ref: ref, token: token })
                                }
                                else {
                                    Toast.show(response.data?.message)
                                }
                            } else {

                                Toast.show(response.problem)
                            }
                        });
                    }} >
                        <Text style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 16,
                            fontFamily: Custom_Fonts.Montserrat_Medium
                        }}>Save</Text>
                    </TouchableOpacity>
                </View>
                {loading && <Loader />}

            </SafeAreaView>
        </ScrollView>
    )
}

export default UserProfileNotification
