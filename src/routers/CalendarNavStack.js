import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MessageScreen from "../screens/MessageScreen";
import CalendarScreen from '../screens/Provider/CalendarScreen';
import CalendarAppointmentDetail from '../screens/Provider/CalendarAppointmentDetail';
const Stack = createNativeStackNavigator()


const CalendarNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="CalendarScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
            <Stack.Screen name="CalendarAppointmentDetail" component={CalendarAppointmentDetail} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
        </Stack.Navigator>
    );
}

export default CalendarNavStack