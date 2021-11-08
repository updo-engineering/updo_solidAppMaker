import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InviteFriends from "../screens/InviteFriends"
import MessageScreen from "../screens/MessageScreen";
import InboxTabScreen from "../screens/Tabs/InboxTabScreen"
import DashboardScreen from '../screens/Provider/DashboardScreen';
const Stack = createNativeStackNavigator()


const DasboardNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="DashboardScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="InviteFriends" component={InviteFriends} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="InboxTabScreen" component={InboxTabScreen} />
        </Stack.Navigator>
    );
}

export default DasboardNavStack