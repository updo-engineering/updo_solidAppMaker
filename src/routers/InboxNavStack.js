import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InboxTabScreen from "../screens/Tabs/InboxTabScreen"

import MessageScreen from "../screens/MessageScreen"
import ViewUpdo from "../screens/ViewUpdo"
import AddPaymentMethod from "../../src/screens/Tabs/AddPaymentMethod";
import PaymentsScreen from "../../src/screens/Tabs/PaymentsScreen";

import EditPaymentScreen from "../../src/screens/Tabs/EditPaymentScreen";

const Stack = createNativeStackNavigator()


const InboxNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="InboxTabScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InboxTabScreen" component={InboxTabScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            
            <Stack.Screen name="ViewUpdo" component={ViewUpdo} />
            <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
           <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
           <Stack.Screen name="EditPaymentScreen" component={EditPaymentScreen} />
        </Stack.Navigator>
    );
}

export default InboxNavStack