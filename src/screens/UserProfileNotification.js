import React from "react";
import { Text, ScrollView, View, toggleSwitch, Switch,TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../screens/TopHeader/TopHeaderView"
import { Colors } from "../Colors/Colors";

const UserProfileNotification = ({ navigation }) => {

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
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
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
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
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
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
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
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
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
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>SMS</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 25, justifyContent: 'space-between', width: '90%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, width: "55%" }}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                            thumbColor="white"
                            ios_backgroundColor={Colors.themeBlue}
                            onValueChange={toggleSwitch}
                            value={true}
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
                            alignSelf:'center',
                            justifyContent: "center",
                            elevation: 3,
                            shadowColor: "grey",
                            shadowOpacity: 0.4,
                            shadowOffset: { width: 0, height: 1 }
                        }} onPress={() => {
                            
                        }} >
                            <Text style={{
                                alignSelf: "center",
                                color: "white",
                                fontSize: 16,
                                fontFamily: Custom_Fonts.Montserrat_Medium
                            }}>Save</Text>
                        </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default UserProfileNotification
