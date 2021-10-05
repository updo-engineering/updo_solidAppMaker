import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window');
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'hair',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'nails',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'skin',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'dummy',
    },
];


const InboxTabScreen = () => {
    return (
        <SafeAreaView>
            <Text style={{ margin: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24 }}>Inbox</Text>

            <View style={{ flexDirection: "row", marginHorizontal: 16, marginTop: 16 }}>
                <Image style={{ resizeMode: "center" }} source={require("../../assets/searchBtn.png")} />
                <TextInput style={styles.pickerTitleStyle} placeholder="Search messages..."></TextInput>
            </View>
            <View style={{ height: 2, backgroundColor: "grey", marginHorizontal: 16 }} />


            <FlatList
                style={{ marginBottom: 100,marginTop:20 }}
                horizontal={false}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={Item}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default InboxTabScreen


const Item = ({ item }) => (
    <View style={{ width:"90%",flexDirection:"row", backgroundColor: "white", borderRadius: 16, height: 72, margin: 16,shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
            <Image style={{ resizeMode: "stretch", width: 44, height: 44, borderRadius: 20, marginHorizontal: 12,marginVertical:14 }} source={require("../../assets/dummy.png")}></Image>
            <View style={{justifyContent:"center"}}>
            <View style={{ flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15 }}>Juliana Baker</Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 13 }}>8/11/20</Text>

            </View>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 13, alignSelf: "center" }}>Review Updo: Your requested Updo rev...</Text>
            </View>
    </View>
);

const styles = StyleSheet.create({
    pickerTitleStyle: {
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Regular,
        marginLeft: 8
    }

});

