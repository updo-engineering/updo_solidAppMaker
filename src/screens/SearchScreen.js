import React from "react";
import { FlatList, Image, SafeAreaView, TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Constants } from "../Constants/Constants";
const DATA = [

];

const RECENT_DATA = [

];

const SearchScreen = ({ navigation, route }) => {
  let providers = route.params?.providers ?? []


  const Item = ({ item }) => {
    console.log(item)
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('UpdoerProfile', { data: item })
      }} style={{ height: 80, alignItems: "center", flexDirection: "row" }}>
        <Image style={{ width: 60, height: 60, resizeMode: "cover", borderRadius: 30,marginLeft:16 }} source={item.profile_pic == "" ? require(".//../assets/dummy.png") : { uri: Constants.IMG_BASE_URL + item.profile_pic }} />
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginLeft: 20, fontSize: 15 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>

      <SafeAreaView>

        <View style={styles.pickerStyle}>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}><Image style={styles.imageStyle} source={require("../assets/backBtn.png")} />
          </TouchableOpacity>
          <TextInput style={styles.pickerTitleStyle} placeholder="How do you Tiptop?" placeholderTextColor="black"
            keyboardType="number-pad"></TextInput>
        </View>


        <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginBottom: 16 }}>Recent Searches</Text>


        <FlatList
          showsHorizontalScrollIndicator={false}
          data={RECENT_DATA}
          renderItem={Item}
          keyExtractor={item => item.id}
        />

        <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginBottom: 16 }}>Popular Tiptoppers near you</Text>


        <FlatList
          showsHorizontalScrollIndicator={false}
          data={providers}
          renderItem={Item}
          keyExtractor={item => item.id}
        />


      </SafeAreaView>
    </View>
  )
}



export default SearchScreen
const styles = StyleSheet.create({
  pickerStyle: {
    width: "90%",
    flexDirection: "row",
    height: 50,
    margin: 18,
    backgroundColor: "white",
    shadowColor: "black",
    borderRadius: 25,
    alignContent: "center",
    alignItems: "center",
    shadowOpacity: 0.4,
    elevation: 6,
    shadowOffset: { width: 0, height: 1 }
  },
  pickerTitleStyle: {
    color: "black",
    width: "80%",
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