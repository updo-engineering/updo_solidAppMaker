import React from "react";
import { FlatList, Image, SafeAreaView, TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Meghan J, Hair, Atlanta',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Juliana Baker, Hair, Atlanta',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Lea J, Hair, Atlanta',
  },
];

const RECENT_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Meghan J, Hair, Atlanta',
  }
];

const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView>

      <View style={styles.pickerStyle}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}><Image style={styles.imageStyle} source={require("../assets/backBtn.png")} />
        </TouchableOpacity>
        <TextInput style={styles.pickerTitleStyle} placeholder="How do you Updo?" placeholderTextColor="black"
          keyboardType="number-pad"></TextInput>
      </View>

      <View style={{ height: 80, alignItems: "center", flexDirection: "row" }}>
        <Image style={{ width: 60, height: 60, resizeMode: "stretch", marginLeft: 16 }} source={require("../assets/location.png")} />
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginLeft: 20, fontSize: 15 }}>Explore nearby Updoers</Text>
      </View>


      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginBottom: 16 }}>Recent Searches</Text>


      <FlatList
        showsHorizontalScrollIndicator={false}
        data={RECENT_DATA}
        renderItem={Item}
        keyExtractor={item => item.id}
      />

      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginBottom: 16 }}>Popular Updoers near you</Text>


      <FlatList
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={Item}
        keyExtractor={item => item.id}
      />


    </SafeAreaView>
  )
}

const Item = ({ item }) => (
  <View style={{ height: 80, alignItems: "center", flexDirection: "row" }}>
    <View style={{ width: 60, height: 60, backgroundColor: "white", borderRadius: 12, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, marginLeft: 15, shadowOffset: { width: 0, height: 1 } }}></View>
    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginLeft: 20, fontSize: 15 }}>{item.title}</Text>
  </View>
);

export default SearchScreen
const styles = StyleSheet.create({
  pickerStyle: {
    width: "90%",
    flexDirection: "row",
    height: 50,
    margin: 18,
    backgroundColor: "white",
    shadowColor: "grey",
    borderRadius: 25,
    alignContent: "center",
    alignItems: "center",
    shadowOpacity: 0.4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 }
  },
  pickerTitleStyle: {
    color: "black",
    width:"80%",
    fontSize: 15,
    fontFamily: Custom_Fonts.Montserrat_Regular,
    marginLeft: 16,
  },
  imageStyle:
  {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginLeft: 16
  }
})