import React,{useState} from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View,FlatList,Image } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Updating My Profile',
        index: 0
    },
    {
        id: '3ac68afc-c605-48df3-a4f8-fbd91aa97f63',
        title: 'Payment Options',
        index: 1
    },
    {
        id: '3ac68afc-c605-48ed3-a4f8-fbd91aaf97f63',
        title: 'Lorem ipsum dolor sit?',
        index: 1
    },
    {
        id: 'bd7acbea-c1b1-46cqe2-aed5-3ad53abb28ba',
        title: 'Lorem ipsum dolor sit?',
        index: 0
    },
    {
        id: '3ac68afc-c605-4we8d3-a4f8-fbd91aa97f63',
        title: 'Lorem ipsum dolor sit?',
        index: 1
    },
    {
        id: '3ac68afc-c605-48dcd3-a4f8-fbd91aaf97f63',
        title: 'Lorem ipsum dolor sit?',
        index: 1
    }
];

const HelpScreen = ({navigation}) => {
    const [selectedIndex, setIndex] = useState(7)
    const Item = ({ item, index }) => (
        <View style={{ borderRadius: 12, backgroundColor: "white",marginVertical:15}}>
            <View style={{ flexDirection: "row", alignSelf: "center", }}>
                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue }]} activeOpacity={0.8} onPress={() => {
                    selectedIndex === index ? setIndex(7):setIndex(index)
                }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.btnTitleStyle}>{item.title}</Text>
                        <Image style={{ width: 20, height: 20, alignSelf: "flex-end", marginEnd: 16, resizeMode: "contain" }} source={require("../assets/downWhite.png")} />
                    </View>
                </TouchableOpacity>
            </View>
            {selectedIndex === index?
            <View style={{ height: 200, backgroundColor: 'white', paddingHorizontal: 16,paddingVertical:8,marginTop:-8,width: "93%",alignSelf:"center",shadowColor:"grey", shadowOpacity: 0.4, elevation: 3,
                        shadowOffset: { width: 0, height: 1 },borderBottomEndRadius:8,borderBottomLeftRadius:8 }}>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas velit lorem, luctus nec sodales porta, auctor sed ante. Nam porttitor libero sit amet libero porttitor, in sodales velit lacinia. In sit amet porttitor an.</Text>
    
            </View>:<View/>}
        </View>
    );

    return (
        <SafeAreaView>
            <TopHeaderView title="Here to Help" />
       
            <FlatList
                horizontal={false}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={Item}
                keyExtractor={item => item.id}
            />
           


        </SafeAreaView>
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
        shadowOffset: { width: 0, height: 1 }
    },
    btnTitleStyle: {
        marginHorizontal: 16,
        color: "white",
        fontSize: 14,
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
});