import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Dimensions } from "react-native";
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


const SavedTabScreen = () => {
    return (
        <SafeAreaView>
            <Text style={{ margin: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24 }}>Saved</Text>

            <FlatList
                style={{ marginBottom: 100 }}
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

export default SavedTabScreen

const Item = ({ item }) => (
    <View style={{ width: width * 0.42, backgroundColor: "white", borderRadius: 16, height: 260, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
        <Image style={{ resizeMode: "stretch", width: 80, height: 80, borderRadius: 40, marginHorizontal: 12, marginTop: 8, alignSelf: "center" }} source={require("../../assets/dummy.png")}></Image>
        <View style={styles.ratingViewStyle} onPress={() => {
            //     navigation.navigate('HomeTabScreen')
        }} >
            <Text style={styles.btnTitleStyle}>4.6 * (17+)</Text>
        </View>
        <Text style={{ marginTop: 8, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, alignSelf: "center" }}>Juliana Baker</Text>
        <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 8 }}>
            <View style={{ height: 30, borderRadius: 15, borderColor: "black", borderWidth: 1, margin: 2, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ marginHorizontal: 8 }}>HairColor</Text>
            </View>
            <View style={{ height: 30, borderRadius: 15, borderColor: "black", borderWidth: 1, margin: 2, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ marginHorizontal: 8 }}>Hair</Text>
            </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center",position:"absolute",bottom:20,width:width * 0.42}}>
            <Image style={{ width: 16, height: 16, resizeMode: "contain", marginLeft: 8, marginRight: 8 }} source={require("../../assets/navPin.png")} />
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 10 }}>0.1 miles away</Text>
            <Image style={{ width: 60, height: 60, resizeMode: "contain", position:"absolute",end:0 }} source={require("../../assets/Save.png")} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    boldTextStyle: {
        color: "white",
        fontSize: 30,
        fontFamily: Custom_Fonts.Montserrat_Black,
        margin: 16

    },
    btnViewStyle: {
        width: "55%",
        height: 32,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        justifyContent: "center"
    },

    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    ratingViewStyle: {
        width: "45%",
        height: 32,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: -15
    },

});
