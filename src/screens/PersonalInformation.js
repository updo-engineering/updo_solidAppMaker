import React, { useState, useEffect } from "react";
import { Text, ScrollView, Dimensions, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
const { width, height } = Dimensions.get('window');
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useSelector } from "react-redux"


const PersonalInformation = ({ navigation }) => {

    const user = useSelector(state => state.userReducer.user)

    return (

        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Personal Information" />
                <Text style={{ margin: 16, fontFamily:Custom_Fonts.Montserrat_Bold,fontSize:17}}>First Name</Text>
                <Text style={{ marginHorizontal: 16, fontFamily:Custom_Fonts.Montserrat_Medium,fontSize:17}}>{user?.name.split(" ")[0]}</Text>

                <Text style={{ margin: 16, fontFamily:Custom_Fonts.Montserrat_Bold,fontSize:17}}>Last Name</Text>
                <Text style={{ marginHorizontal: 16, fontFamily:Custom_Fonts.Montserrat_Medium,fontSize:17}}>{user?.name.split(" ").length > 1? user?.name.split(" ")[1] : ''}</Text>

                <Text style={{ margin: 16, fontFamily:Custom_Fonts.Montserrat_Bold,fontSize:17}}>Birth Date</Text>
                <Text style={{ marginHorizontal: 16, fontFamily:Custom_Fonts.Montserrat_Medium,fontSize:17}}>{user?.dob ?? ''}</Text>

            </SafeAreaView>
        </ScrollView>
    );
}

export default PersonalInformation



