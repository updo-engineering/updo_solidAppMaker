import React from "react";
import SplashScreen from "../screens/SplashScreen"
import SelectionScreen from "../screens/SelectionScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavStack from "./TabNavStack";

const Stack = createNativeStackNavigator()


const SplashNavStack = () => {
    return (
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavStack} />

        </Stack.Navigator>
    );
}

export default SplashNavStack