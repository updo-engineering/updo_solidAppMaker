import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdosTabScreen from "../screens/Tabs/UpdosTabScreen";
import UpdoBuildStep1 from "../screens/UpdoBuilder/UpdoBuildStep1";
import SetAppointmentTime from "../screens/UpdoBuilder/SetAppointmentTime";
import UpdoBuildStep2 from "../screens/UpdoBuilder/UpdoBuildStep2";
import MessageScreen from "../screens/MessageScreen";
import InboxTabScreen from "../screens/Tabs/InboxTabScreen"
import InviteFriends from "../screens/InviteFriends"
import ViewUpdo from "../screens/ViewUpdo"
import AddPaymentMethod from "../../src/screens/Tabs/AddPaymentMethod";
import PaymentsScreen from "../../src/screens/Tabs/PaymentsScreen";
import CompletePaymentPage from "../../src/screens/CompletePaymentPage";
import AppointmentDetails from "../../src/screens/AppointmentDetails";

import EditPaymentScreen from "../../src/screens/Tabs/EditPaymentScreen";
const Stack = createNativeStackNavigator()


const UpdoNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="UpdosTabScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UpdosTabScreen" component={UpdosTabScreen} />
            <Stack.Screen name="UpdoBuildStep1" component={UpdoBuildStep1} />
            <Stack.Screen name="UpdoBuildStep2" component={UpdoBuildStep2} />
            <Stack.Screen name="SetAppointmentTime" component={SetAppointmentTime} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="InboxTabScreen" component={InboxTabScreen} />
            <Stack.Screen name="InviteFriends" component={InviteFriends} />
            <Stack.Screen name="ViewUpdo" component={ViewUpdo} />
            <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
           <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
           <Stack.Screen name="EditPaymentScreen" component={EditPaymentScreen} />
           <Stack.Screen name="CompletePaymentPage" component={CompletePaymentPage} />
           <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />

            
        </Stack.Navigator>
    );
}

export default UpdoNavStack