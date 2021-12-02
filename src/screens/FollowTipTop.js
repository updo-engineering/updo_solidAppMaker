import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "./TopHeader/TopHeaderView";

const FollowTipTop = ({ navigation }) => {

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            <SafeAreaView>
                <TopHeaderView title="Follow TipTop" />

                <ScrollView style={{ width: "100%" }}
                    horizontal={false}
                    scrollEventThrottle={16}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 20, fontSize: 15 }}>Community is at the core of what we do at TipTop. Follow us to stay updated on all-things TipTop!</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginVertical: 20 }}>Welcome to the TipTop Community</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 25, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: '46%', height: 125, marginVertical: 12 }} onPress={() => {
                            Linking.openURL('https://www.instagram.com/gotiptop/')
                        }} >
                            <Image style={{ width: '100%', height: 125, alignSelf: "center", borderRadius: 8 }} source={require("../assets/followInsta.png")} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '46%', height: 125, marginVertical: 12 }} onPress={() => {
                            Linking.openURL('https://twitter.com/go_tiptop')
                        }} >
                            <Image style={{ width: '100%', height: 125, alignSelf: "center", borderRadius: 8 }} source={require("../assets/followTwitter.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 25, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: '46%', height: 125, marginVertical: 12 }} onPress={() => {
                            Linking.openURL('https://www.facebook.com/TipTop-102336421590302/')
                        }} >
                            <Image style={{ width: '100%', height: 125, alignSelf: "center", borderRadius: 8 }} source={require("../assets/followFB.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '46%', height: 125, marginVertical: 12 }} onPress={() => {
                            Linking.openURL('https://www.linkedin.com/company/jointiptop')
                        }} >
                            <Image style={{ width: '100%', height: 125, alignSelf: "center", borderRadius: 8 }} source={require("../assets/followLinkedIn.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 25, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: '46%', height: 125, marginVertical: 12 }} onPress={() => {

                        }} >
                            <Image style={{ width: '100%', height: 125, alignSelf: "center", borderRadius: 8 }} source={require("../assets/followYT.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '46%', height: 125, marginVertical: 12 }} onPress={() => {
                            Linking.openURL('https://open.spotify.com/show/6ljisqNju1oSfl1lo9y0ah?si=508ef25154254ee9')
                        }} >
                            <Image style={{ width: '100%', height: 125, alignSelf: "center", borderRadius: 8 }} source={require("../assets/followSpotify.png")} />
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </SafeAreaView>
        </View>
    );
}

export default FollowTipTop