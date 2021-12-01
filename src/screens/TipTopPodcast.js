import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "./TopHeader/TopHeaderView";

const TipTopPodcast = ({ navigation }) => {

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            <SafeAreaView>
                <TopHeaderView title="The TipTop Podcast" />

                <ScrollView style={{ width: "100%" }}
                    horizontal={false}
                    scrollEventThrottle={16}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 20, fontSize: 15 }}>Community is at the core of what we do at TipTop. The mission behind the TipTop Podcast is to drive connection and share the stories of our TipToppers and partners across the TipTop Community.</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginVertical: 20 }}>How do you listen? </Text>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL('https://open.spotify.com/show/6ljisqNju1oSfl1lo9y0ah')
                    }} >
                        <Image style={{ width: 200, height: 125, alignSelf: "center", borderRadius: 8, marginVertical: 12 }} source={require("../assets/spotify.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL('https://jointiptop.com')
                    }} >
                        <Image style={{ width: 200, height: 125, alignSelf: "center", borderRadius: 8, marginVertical: 12 }} source={require("../assets/yt.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL('https://podcasts.apple.com/us/podcast/the-tiptop-podcast/id1543617939')
                    }} >
                        <Image style={{ width: 200, height: 125, alignSelf: "center", borderRadius: 8, marginVertical: 12 }} source={require("../assets/applePodcast.png")} />
                    </TouchableOpacity>
                </ScrollView>

            </SafeAreaView>
        </View>
    );
}

export default TipTopPodcast