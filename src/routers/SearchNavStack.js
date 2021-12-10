import React, { useEffect } from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabScreen from "../screens/Tabs/HomeTabScreen"

import InviteFriends from "../screens/InviteFriends";
import ReferServiceProvider from "../screens/ReferServiceProvider"
import HowUpdoWorks from "../screens/HowUpdoWorks";
import SearchScreen from "../screens/SearchScreen";
import UpdoerProfile from "../screens/UpdoerProfile";
import SearchResultScreen from "../screens/SearchResultScreen";
import SchduleScreen from "../screens/SchduleScreen";
import MessageScreen from "../screens/MessageScreen";
import LearnMore from "../screens/LearnMore";
import ShareLink from "../screens/ShareLink";
import TipTopPodcast from "../screens/TipTopPodcast";
import HelpScreen from "../screens/HelpScreen";
import GiveUsFeedback from "../screens/GiveUsFeedback";
import PartnerWithUs from "../screens/PartnerWithUs";
import HelpUsGrow from "../screens/HelpUsGrow";
import FollowTipTop from "../screens/FollowTipTop";
import TermsScreen from '../screens/TermsScreen';

import InboxTabScreen from "../screens/Tabs/InboxTabScreen"

const Stack = createNativeStackNavigator()


const SearchNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomeTabScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} />
            <Stack.Screen name="InviteFriends" component={InviteFriends} />
            <Stack.Screen name="HowUpdoWorks" component={HowUpdoWorks} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="UpdoerProfile" component={UpdoerProfile} />
            <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
            <Stack.Screen name="SchduleScreen" component={SchduleScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="InboxTabScreen" component={InboxTabScreen} />
            <Stack.Screen name="LearnMore" component={LearnMore} />
            <Stack.Screen name="ReferServiceProvider" component={ReferServiceProvider} />
            <Stack.Screen name="ShareLink" component={ShareLink} />
            <Stack.Screen name="TipTopPodcast" component={TipTopPodcast} />
            <Stack.Screen name="HelpScreen" component={HelpScreen} />
            <Stack.Screen name="GiveUsFeedback" component={GiveUsFeedback} />
            <Stack.Screen name="PartnerWithUs" component={PartnerWithUs} />
            <Stack.Screen name="HelpUsGrow" component={HelpUsGrow} />
            <Stack.Screen name="FollowTipTop" component={FollowTipTop} />
            <Stack.Screen name="TermsScreen" component={TermsScreen} />

        </Stack.Navigator>
    );
}

export default SearchNavStack