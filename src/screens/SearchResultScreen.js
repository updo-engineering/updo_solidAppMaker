import React from "react";
import { FlatList, Image, SafeAreaView, TouchableOpacity,View,Text } from "react-native";
import {Custom_Fonts} from "../Constants/Font";
import HeaderView from "./Header.js/HeaderView";

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

const SearchResultScreen = () => {
    return (
        <SafeAreaView>
       <HeaderView title = "Hair"/>
       <TouchableOpacity onPress={() => {
        //action
      }} >
       <Image style = {{width:90,height:26, resizeMode:"contain",alignSelf:"flex-end",marginEnd:20}} source = {require("../assets/sortBtn.png")}/>
       </TouchableOpacity>

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
    <View style={{height:80,alignItems:"center",flexDirection:"row"}}>
      <View style = {{width:60,height:60,backgroundColor:"white",borderRadius:12,shadowColor:"grey",shadowOpacity:0.4,elevation:3,marginLeft:15,shadowOffset: { width: 0, height: 1 }}}></View>
      <Text style={{fontFamily:Custom_Fonts.Montserrat_SemiBold,marginLeft:20,fontSize:14}}>{item.title}</Text>
    </View>
  );

export default SearchResultScreen
