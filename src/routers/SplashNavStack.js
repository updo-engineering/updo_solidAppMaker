import React,{useEffect} from "react";
import SplashScreen from "../screens/SplashScreen"
import SelectionScreen from "../screens/SelectionScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavStack from "./TabNavStack";
import SignInScreen from "../screens/SignInScreen";
import VerifyPhoneScreen from "../screens/VerifyPhoneScreen";
import EmailLogin from "../screens/EmailLogin";
import ProfileSubmitted from "../screens/ProfileSubmitted";
import { SetRef } from '../Redux/userDetail'
import { useSelector,useDispatch } from "react-redux"
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator()


const SplashNavStack = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    
    useEffect(() =>{
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        return () => unsubscribe();
      }, [])
    
      const handleDynamicLink = (link) => {
        let code = link?.url.replace('https://tiptoprn.page.link/?referral=','')
        storeData({ref: code,user: user,token:token})
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

    return (
        <Stack.Navigator initialRouteName={"SplashScreen"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="VerifyPhoneScreen" component={VerifyPhoneScreen} />
            <Stack.Screen name="EmailLogin" component={EmailLogin} />
            <Stack.Screen name="ProfileSubmitted" component={ProfileSubmitted} />
            <Stack.Screen name="TabNavStack" component={TabNavStack} />
            <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
      
            
        </Stack.Navigator>
    );
}

export default SplashNavStack