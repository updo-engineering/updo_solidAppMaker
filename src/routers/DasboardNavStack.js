import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InviteFriends from "../screens/InviteFriends"
import TransactionList from "../screens/TransactionList"

import MessageScreen from "../screens/MessageScreen";
import EarningScreen from "../screens/EarningScreen";
import TipTopPodcast from "../screens/TipTopPodcast";
import InboxTabScreen from "../screens/Tabs/InboxTabScreen"
import DashboardScreen from '../screens/Provider/DashboardScreen';
import HistoryDetails from "../screens/HistoryDetails";
import PartnerWithUs from "../screens/PartnerWithUs";
import ClientDetail from "../screens/ClientDetail";

const Stack = createNativeStackNavigator()


const DasboardNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="DashboardScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="InviteFriends" component={InviteFriends} />
            <Stack.Screen name="TipTopPodcast" component={TipTopPodcast} />
            <Stack.Screen name="EarningScreen" component={EarningScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="InboxTabScreen" component={InboxTabScreen} />
            <Stack.Screen name="TransactionList" component={TransactionList} />
            <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
            <Stack.Screen name="PartnerWithUs" component={PartnerWithUs} />
            <Stack.Screen name="ClientDetail" component={ClientDetail} />

        </Stack.Navigator>
    );
}

export default DasboardNavStack