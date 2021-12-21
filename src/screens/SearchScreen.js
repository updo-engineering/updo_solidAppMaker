import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Constants } from "../Constants/Constants";
import { useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';

const RECENT_DATA = [

];

const SearchScreen = ({ navigation, route }) => {
  let providers = route.params?.providers ?? []
  const [providerData, setProviderData] = useState(providers)
  const user = useSelector(state => state.userReducer.user)

  const Item = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        if (user.gender == ''){
          Toast.show('Please complete your profile')
        }
        else{navigation.navigate('UpdoerProfile', { data: item })}
      }} style={{ height: 80, alignItems: "center", flexDirection: "row" }}>
        <Image style={{ width: 60, height: 60, resizeMode: "cover", borderRadius: 30, marginLeft: 16 }} source={item.profile_pic == "" ? require(".//../assets/dummy.png") : { uri: item.profile_pic.includes('https://') ? item.profile_pic : Constants.IMG_BASE_URL + item.profile_pic }} />
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
          <TextInput style={styles.pickerTitleStyle} placeholder="How do you Tiptop?" placeholderTextColor="black" onChangeText={(t) => {
            if (t == '') {
              setProviderData(providers)
            }
            else {
              setProviderData(providers.filter((data) => data.name.toLowerCase().includes(t.toLowerCase())))
            }
          }} />
        </View>


        {/* <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginBottom: 16 }}>Recent Searches</Text>


        <FlatList
          showsHorizontalScrollIndicator={false}
          data={RECENT_DATA}
          renderItem={Item}
          keyExtractor={item => item.id}
        /> */}

        {providers.length > 0 ? <View> 
          <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 16, marginBottom: 16 }}>Popular Tiptoppers near you</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={providerData}
            renderItem={Item}
            keyExtractor={item => item.id}
          /></View> : null}



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
    fontSize: 14,
    marginTop: 4,
    fontFamily: Custom_Fonts.Montserrat_Medium,
    marginLeft: 16,
  },
  imageStyle:
  {
    width: 16,
    height: 16,
    alignSelf: 'center',
    resizeMode: "contain",
    marginLeft: 16
  }
})