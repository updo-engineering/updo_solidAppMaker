import React from "react";
import { Text, StyleSheet, View, toggleSwitch,Switch } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../screens/TopHeader/TopHeaderView"
import { Colors } from "../Colors/Colors";

const UserProfileNotification = ({navigation}) => {
    
    return (
        <SafeAreaView>
            <TopHeaderView title="Notifications" />
            <View style={{ paddingHorizontal: 16 }}>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 18 }}>Updo Updates</Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 12, marginVertical: 16, width: "80%" }}>Receive messages and reminders from Updoers, including Updo requests.</Text>

                <View style={{ flexDirection: "row",marginTop:25 }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, width: "55%" }}>Email</Text>
                    <Switch
                        trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                        thumbColor="white"
                        ios_backgroundColor={Colors.themeBlue}
                        onValueChange={toggleSwitch}
                        value={true}
                    />
                </View>

                <View style={{ flexDirection: "row",marginTop:25 }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, width: "55%" }}>Push notifications</Text>
                    <Switch
                        trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                        thumbColor="white"
                        ios_backgroundColor={Colors.themeBlue}
                        onValueChange={toggleSwitch}
                        value={true}
                    />
                </View>

                <View style={{ flexDirection: "row",marginTop:25 }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, width: "55%" }}>Text messages</Text>
                    <Switch
                        trackColor={{ false: Colors.greyColor, true: Colors.themeBlue }}
                        thumbColor="white"
                        ios_backgroundColor={Colors.themeBlue}
                        onValueChange={toggleSwitch}
                        value={true}
                    />
                </View>


            </View>

        </SafeAreaView>
    )
}

export default UserProfileNotification
