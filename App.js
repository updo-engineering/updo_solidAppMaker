import React from "react";
import SplashNavStack from "./src/routers/SplashNavStack"

import { NavigationContainer } from '@react-navigation/native';
import SavedTabScreen from "./src/screens/Tabs/SavedTabScreen";
import HomeTabScreen from "./src/screens/Tabs/HomeTabScreen";
import UpdosTabScreen from "./src/screens/Tabs/UpdosTabScreen";
import SearchScreen from "./src/screens/SearchScreen";
import SearchResultScreen from "./src/screens/SearchResultScreen";
import InboxTabScreen from "./src/screens/Tabs/InboxTabScreen";



const App = () => {
  return (
  <InboxTabScreen/>
  //   <NavigationContainer>
  //   <SplashNavStack/>
  // </NavigationContainer>
  );
}

export default App

