import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from "../Colors/Colors";
import ProfileNavStack from "./ProfileNavStack";
import SearchNavStack from "./SearchNavStack";
import SavedTabScreen from "../screens/Tabs/SavedTabScreen";
import UpdoNavStack from "./UpdoNavStack";
import InboxNavStack from "./InboxNavStack";
import DasboardNavStack from "../routers/DasboardNavStack";
import CalendarNavStack from "../routers/CalendarNavStack";
import { useSelector } from "react-redux"

const Tab = createBottomTabNavigator();

export default function TabNavStack() {
  let type = ""
  const user = useSelector(state => state.userReducer.user)
  const auth = useSelector(state => state.userReducer.auth)
  const ty = useSelector(state => state.userReducer.type)
  if (auth)
  {
    console.log('>>>>>>NA',user.user_type)
     type = user.user_type
  }
  else{
    console.log('>>>>>>NA',ty)
     type = ty
  }
  return (

    <Tab.Navigator
    tabBarOptions={{
      keyboardHidesTabBar: true
   }} 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "SearchNavStack":
              iconName = require("../../src/assets/search.png");
              break;
            case "DasboardNavStack":
              iconName = require("../../src/assets/dashboard.png");
              break;
              case "CalendarNavStack":
              iconName = require("../../src/assets/calendarIcon.png");
              break;
            case "SavedTabScreen":
              iconName = require("../../src/assets/saved.png");
              break;
            case "UpdoNavStack":
              iconName = require("../../src/assets/updos.png");
              break;
            case "InboxNavStack":
              iconName = require("../../src/assets/inbox.png");
              break;
            case "ProfileNavStack":
              iconName = require("../../src/assets/profile.png");
              break;
            default:
              break;
          }
          return <Image style={{ width: 24, height: 22,resizeMode: "contain",tintColor: focused ? Colors.pinkColor : "white" }} source={iconName} />;
        },
        tabBarStyle: { backgroundColor: Colors.blueText },
        headerShown: false,
        tabBarShowLabel: false
        

      })}  >
      {
        type === 'Customer' ? <Tab.Screen name="SearchNavStack" component={SearchNavStack} /> : <Tab.Screen name="DasboardNavStack" component={DasboardNavStack} />
      }
      {
         type === 'Customer' ? <Tab.Screen name="SavedTabScreen" component={SavedTabScreen} /> : <Tab.Screen name="CalendarNavStack" component={CalendarNavStack} />
      }
    
      <Tab.Screen name="UpdoNavStack" component={UpdoNavStack} />
      <Tab.Screen name="InboxNavStack" component={InboxNavStack} />
      <Tab.Screen name="ProfileNavStack" component={ProfileNavStack} />
    </Tab.Navigator>

  );
}