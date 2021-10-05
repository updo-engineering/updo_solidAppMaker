import React from "react";
import { Image} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabScreen from "../screens/Tabs/HomeTabScreen"
import { Colors } from "../Colors/Colors";
const Tab = createBottomTabNavigator();

export default function HomeNavStack() {
    return (

      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTabScreen') {
            iconName = require("../../src/assets/search.png");
          }

          return <Image source = {iconName}/>;
        },
        tabBarActiveTintColor:  Colors.pinkColor,
        tabBarInactiveTintColor: 'white',
      })}
    >
          <Tab.Screen name="HomeTabScreen" component={HomeTabScreen} />
        </Tab.Navigator>
   
    );
  }