import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileBeforeSignIn from "../screens/BeforeRegisterScreens/ProfileBeforeSignIn";
import SignInScreen from "../screens/SignInScreen";
import VerifyPhoneScreen from "../screens/VerifyPhoneScreen";
import NotificationScreen from "../screens/NotificationScreen";
import HowDoYouUpdo from "../screens/HowDoYouUpdo";
import CreateYourProfile from "../screens/CreateYourProfile";
import CreateProfileStep2 from "../screens/CreateProfileStep2";
import CreateProfileStep5 from "../screens/CreateProfileStep5";
import CreateProfileStep4 from "../screens/CreateProfileStep4";
import CreateProfileStep3 from "../screens/CreateProfileStep3";
import ProfileSubmitted from "../screens/ProfileSubmitted";
import UserProfile from "../screens/UserProfile";
import TermsScreen from "../screens/TermsScreen";
import SafetyCenter from "../screens/SafetyCenter";
import HowUpdoWorks from "../screens/HowUpdoWorks";
import GiveUsFeedback from "../screens/GiveUsFeedback";
import ProductFeedBack from "../screens/ProductFeedBack";
import ReportBug from "../screens/ReportBug";
import ContactSupport from "../screens/ContactSupport";
import CreateProfileCommon from "../screens/CreateProfileCommon";
import ReferServiceProvider from "../screens/ReferServiceProvider";
import InviteFriends from "../screens/InviteFriends";
import UserProfileNotification from "../screens/UserProfileNotification";
import ShareLink from "../screens/ShareLink";
import SwitchingUpdoer from "../screens/SwitchingUpdoer";
import HelpScreen from "../screens/HelpScreen";
import HowReferWorks from "../screens/HowReferWorks";
import AddPaymentMethod from "../../src/screens/Tabs/AddPaymentMethod";
import PaymentsScreen from "../../src/screens/Tabs/PaymentsScreen";

import EditPaymentScreen from "../../src/screens/Tabs/EditPaymentScreen";
import UpdoerProfile from "../screens/UpdoerProfile";
import MapScreen from "../screens/MapScreen";
import SocialLinkUpdate from "../screens/SocialLinkUpdate";
import TipTopPodcast from "../screens/TipTopPodcast";
import FollowTipTop from "../screens/FollowTipTop";
import PartnerWithUs from "../screens/PartnerWithUs";
import ClientDetail from "../screens/ClientDetail";
import LearnMore from "../screens/LearnMore";
import PersonalInformation from "../screens/PersonalInformation";
import StartTiptopJourney from "../screens/StartTiptopJourney";
import TipTopRewards from "../screens/TipTopRewards";

const Stack = createNativeStackNavigator()


const ProfileNavStack = () => {
    return (
           <Stack.Navigator initialRouteName="UserProfile" screenOptions={{ headerShown: false }}>
           <Stack.Screen name="ProfileBeforeSignIn" component={ProfileBeforeSignIn} />
           <Stack.Screen name="SignInScreen" component={SignInScreen} />
           <Stack.Screen name="VerifyPhoneScreen" component={VerifyPhoneScreen} />
           <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
           <Stack.Screen name="HowDoYouUpdo" component={HowDoYouUpdo} />
           <Stack.Screen name="CreateYourProfile" component={CreateYourProfile} />
           <Stack.Screen name="CreateProfileStep2" component={CreateProfileStep2} />
           <Stack.Screen name="CreateProfileStep3" component={CreateProfileStep3} />
           <Stack.Screen name="CreateProfileStep4" component={CreateProfileStep4} />
           <Stack.Screen name="CreateProfileStep5" component={CreateProfileStep5} />
           <Stack.Screen name="ProfileSubmitted" component={ProfileSubmitted} />
           <Stack.Screen name="UserProfile" component={UserProfile} />
           <Stack.Screen name="TermsScreen" component={TermsScreen} />
           <Stack.Screen name="SafetyCenter" component={SafetyCenter} />
           <Stack.Screen name="HowUpdoWorks" component={HowUpdoWorks} />
           <Stack.Screen name="GiveUsFeedback" component={GiveUsFeedback} />
           <Stack.Screen name="ProductFeedBack" component={ProductFeedBack} />
           <Stack.Screen name="ReportBug" component={ReportBug} />
           <Stack.Screen name="ContactSupport" component={ContactSupport} />
           <Stack.Screen name="ReferServiceProvider" component={ReferServiceProvider} />
           <Stack.Screen name="InviteFriends" component={InviteFriends} />
           <Stack.Screen name="UserProfileNotification" component={UserProfileNotification} />
           <Stack.Screen name="ShareLink" component={ShareLink} />
           <Stack.Screen name="SwitchingUpdoer" component={SwitchingUpdoer} />
           <Stack.Screen name="HelpScreen" component={HelpScreen} />
           <Stack.Screen name="HowReferWorks" component={HowReferWorks} />
           <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
           <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
           <Stack.Screen name="EditPaymentScreen" component={EditPaymentScreen} />
           <Stack.Screen name="UpdoerProfile" component={UpdoerProfile} />
           <Stack.Screen name="MapScreen" component={MapScreen} />
           <Stack.Screen name="SocialLinkUpdate" component={SocialLinkUpdate} />
           <Stack.Screen name="TipTopPodcast" component={TipTopPodcast} />
           <Stack.Screen name="FollowTipTop" component={FollowTipTop} />
           <Stack.Screen name="PartnerWithUs" component={PartnerWithUs} />
           <Stack.Screen name="CreateProfileCommon" component={CreateProfileCommon} />
           <Stack.Screen name="ClientDetail" component={ClientDetail} />
           <Stack.Screen name="LearnMore" component={LearnMore} />
           <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
           <Stack.Screen name="StartTiptopJourney" component={StartTiptopJourney} />
           <Stack.Screen name="TipTopRewards" component={TipTopRewards} />
           
       </Stack.Navigator>
    );
}

export default ProfileNavStack