import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, TouchableOpacity, View, Text, Dimensions, Platform } from "react-native";
import { validURL } from "../apiSauce/HttpInteractor";
import { Constants } from "../Constants/Constants";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "../screens/TopHeader/TopHeaderView"
const { width, height } = Dimensions.get('window');


const SearchResultScreen = (props) => {
  const [isVisible, setSortPopUpVisibility] = useState(false);
  const [DATA, setData] = useState(props.route.params.data);

  const Item = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {
      props.navigation.navigate('UpdoerProfile', { data: item })
    }} style={{ height: 80, alignItems: "center", flexDirection: "row" }}>
      <View style={{ width: 60, height: 60, backgroundColor: "white", borderRadius: 30, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, marginLeft: 15, shadowOffset: { width: 0, height: 1 } }}>
        <Image style={{ width: 60, height: 60, resizeMode: "cover", borderRadius: 30 }} source={validURL(Constants.IMG_BASE_URL + item.profile_pic) && item.profile_pic != "" ? { uri: Constants.IMG_BASE_URL + item.profile_pic } : require("../assets/dummy.png")} />
      </View>
      <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginLeft: 20, fontSize: 14 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const SortView = () => {
    return (
      <View style={{ zIndex: 1, width: 180, backgroundColor: "white", borderRadius: 12, shadowColor: "grey", padding: 8, shadowOpacity: 0.4, elevation: 3, position: "absolute", top: Platform.OS == "android" ? 100 : 140, end: 16, shadowOffset: { width: 0, height: 1 } }}>
        <TouchableOpacity style={{  padding: 8 }}
          onPress={() => {
            
            setSortPopUpVisibility(!isVisible)
          }} >
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 12 }}>Nearest location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 8 }} onPress={() => {
          setSortPopUpVisibility(!isVisible)
        }} >
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 12 }}>Most Popular</Text>
        </TouchableOpacity>
{/* 
        <TouchableOpacity style={{ padding: 8 }} onPress={() => {
          setSortPopUpVisibility(!isVisible)
        }} >
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 12 }}>Lowest to highest Price</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 8 }} onPress={() => {
          setSortPopUpVisibility(!isVisible)
        }} >
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 12 }}>Highest to lowest Price</Text>
        </TouchableOpacity> */}

      </View>
    )
  }

  return (
    <View style={{ backgroundColor: "white", height }}>
      <SafeAreaView>
        <TopHeaderView title={props.route.params.serviceName} />
        {/* <TouchableOpacity onPress={() => {
          setSortPopUpVisibility(!isVisible)
        }} >
          <Image style={{ width: 90, height: 26, resizeMode: "contain", alignSelf: "flex-end", marginEnd: 20 }} source={require("../assets/sortBtn.png")} />
        </TouchableOpacity> */}
        {isVisible ? <SortView /> : null}
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  )
}






export default SearchResultScreen
