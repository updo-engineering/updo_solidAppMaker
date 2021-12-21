import React, { useEffect, useState } from "react";
import { Image, Platform, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from "../Colors/Colors";
import ProfileNavStack from "./ProfileNavStack";
import SearchNavStack from "./SearchNavStack";
import SavedNavStack from "./SavedNavStack";
import UpdoNavStack from "./UpdoNavStack";
import InboxNavStack from "./InboxNavStack";
import DasboardNavStack from "../routers/DasboardNavStack";
import CalendarNavStack from "../routers/CalendarNavStack";
import { useSelector, useDispatch } from "react-redux"
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { SetRef } from '../Redux/userDetail'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { updateFcm } from "../apiSauce/HttpInteractor";

export default function TabNavStack(props) {
  let type = ""
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.user)
  const token = useSelector(state => state.userReducer.token)
  const auth = useSelector(state => state.userReducer.auth)
  const [msgAlert, setMsgAlert] = useState(false)
  const [tipTopAlert, setTipTopAlert] = useState(false)
  const eventCollection = firestore().collection('events').doc(user?._id);

  useEffect(() => {
    GetToken()
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, [])

  const GetToken = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      const fcm = await messaging().getToken()
       
    updateFcm(user.user_type == 'isCustomer',fcm,token)

    }
  }

  useEffect(() => {
    eventCollection.onSnapshot((snapshot) => {
      let d = snapshot?._data
      console.log(user?._id)
      setMsgAlert(d?.new_chat_message ?? false)
      setTipTopAlert(d?.new_tip_top ?? false)
    }, (error) => {
        console.log(error)
    });
}, []);


  const handleDynamicLink = (link) => {
    let code = link?.url.replace('https://jointiptop.page.link/?referral=', '')
    storeData({ ref: code, user: user, token: token })
    dispatch(SetRef(code));
  }

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('UserDetail', jsonValue);
    } catch (e) {
    } finally {
    }
  };

  if (auth) {
    type = user?.user_type
  }
  React.useEffect(() => {
    if (auth) {
    } else {
      props.navigation.replace("SignInScreen")
    }
  }, [auth])

  return (

    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,

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
            case "SavedNavStack":
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
          return <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", alignContent: "center" }}>
            {route.name == 'UpdoNavStack' && tipTopAlert ? <View style={{ width: 5, height: 5, backgroundColor: 'pink', alignSelf: 'flex-end', marginBottom: 8,marginTop:-8, borderRadius: 2.5, marginRight: -5 }} />
              : null}
            {route.name == 'InboxNavStack' && msgAlert ? <View style={{ width: 5, height: 5, backgroundColor: 'pink', alignSelf: 'flex-end', marginBottom: 8,marginTop:-8, borderRadius: 2.5, marginRight: -5 }} />
              : null}
            <Image style={{ bottom: Platform.OS == 'ios' ? 0 : 10, width: route.name == 'UpdoNavStack' ? 33 : route.name == 'SearchNavStack' ? 22 : 24, height: route.name == 'UpdoNavStack' ? 28 : 24, resizeMode: "contain", tintColor: focused ? Colors.pinkColor : "white" }} source={iconName} /></View>;
        },
        tabBarStyle: { backgroundColor: Colors.blueText, height: 80 },
        headerShown: false,
        tabBarShowLabel: false
      })}  >
      {
        type === 'Customer' ? <Tab.Screen name="SearchNavStack" component={SearchNavStack} /> : <Tab.Screen name="DasboardNavStack" component={DasboardNavStack} />
      }
      {
        type === 'Customer' ? <Tab.Screen name="SavedNavStack" component={SavedNavStack} /> : <Tab.Screen name="CalendarNavStack" component={CalendarNavStack} />
      }

      <Tab.Screen name="UpdoNavStack" component={UpdoNavStack} />
      <Tab.Screen name="InboxNavStack" component={InboxNavStack} />
      <Tab.Screen name="ProfileNavStack" component={ProfileNavStack} />
    </Tab.Navigator>

  );
}