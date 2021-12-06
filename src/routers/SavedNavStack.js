import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MessageScreen from "../screens/MessageScreen";
import SchduleScreen from '../screens/SchduleScreen';
import SavedTabScreen from '../screens/Tabs/SavedTabScreen';
const Stack = createNativeStackNavigator()


const SavedNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="SavedTabScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SavedTabScreen" component={SavedTabScreen} />
            <Stack.Screen name="SchduleScreen" component={SchduleScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
        </Stack.Navigator>
    );
}

export default SavedNavStack