import React from "react";
import SplashScreen from "../screens/SplashScreen"
import SelectionScreen from "../screens/SelectionScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavStack from "./TabNavStack";
import SignInScreen from "../screens/SignInScreen";
import VerifyPhoneScreen from "../screens/VerifyPhoneScreen";
import EmailLogin from "../screens/EmailLogin";
import ProfileSubmitted from "../screens/ProfileSubmitted";

const Stack = createNativeStackNavigator()


const SplashNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="TabNavStack" component={TabNavStack} />
            <Stack.Screen name="VerifyPhoneScreen" component={VerifyPhoneScreen} />
            <Stack.Screen name="EmailLogin" component={EmailLogin} />
            <Stack.Screen name="ProfileSubmitted" component={ProfileSubmitted} />
            
        </Stack.Navigator>
    );
}

export default SplashNavStack