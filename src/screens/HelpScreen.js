import React,{useState} from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View,FlatList,Image } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { getFAQ } from "../apiSauce/HttpInteractor";
import {  useFocusEffect } from '@react-navigation/native';

const HelpScreen = ({navigation}) => {
    const [faq, setFaq] = useState([]);
    const [loading,setLoading] = useState(false)
    const [selectedIndex, setIndex] = useState(100000)
    useFocusEffect(
        React.useCallback(() => {
            getFAQ().then(response => {
                setLoading(true)
                if (response.ok) {
                  if (response.data?.status === true) {
                    setLoading(false)
                    setFaq(response.data.data)
                  }
                  else {
                    setLoading(false)
                    Toast.show(response.data.message)
                  }
                } else {
                  setLoading(false)
                  Toast.show(response.problem)
                }
              });
          return () => {
            //unfocused
          };
        }, [])
      );

      const Item = ({ item, index }) => (
        <View style={{ borderRadius: 12, backgroundColor: "white"}}>
            <View style={{ flexDirection: "row", alignSelf: "center", }}>
                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue }]} activeOpacity={0.8} onPress={() => {
                    selectedIndex === index ? setIndex(100000):setIndex(index)
                }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.btnTitleStyle}>{item.question}</Text>
                        <Image style={{ width: 20, height: 20, alignSelf: "flex-end", marginEnd: 16, resizeMode: "contain" }} source={selectedIndex === index ? require("../assets/upArrow.png"):require("../assets/downWhite.png")} />
                    </View>
                </TouchableOpacity>
            </View>
            {selectedIndex === index?
            <View style={{ backgroundColor: 'white',marginBottom:8, paddingHorizontal: 16,paddingVertical:8,marginTop:-16,width: "93%",alignSelf:"center",shadowColor:"grey", shadowOpacity: 0.4, elevation: 3,
                        shadowOffset: { width: 0, height: 1 },borderBottomEndRadius:8,borderBottomLeftRadius:8 }}>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15 }}>{item.answer}</Text>
    
            </View>:<View/>}
        </View>
    );

    return (
        <View style={{width: '100%', height: '100%',backgroundColor: 'white'}}>
        <SafeAreaView>
            <TopHeaderView title="FAQ" />
       
            <FlatList
                horizontal={false}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={faq}
                renderItem={Item}
                keyExtractor={item => item.id}
            />
           


        </SafeAreaView>
        </View>
    );
}

export default HelpScreen

const styles = StyleSheet.create({
    btnViewStyle: {
        height: 50,
        width: "93%",
        borderRadius: 12,
        justifyContent: "center",elevation:3,
        shadowColor:"grey", shadowOpacity: 0.4, elevation: 3,
        shadowOffset: { width: 0, height: 1 },marginVertical:8
    },
    btnTitleStyle: {
        marginHorizontal: 16,
        color: "white",
        fontSize: 14,
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
});