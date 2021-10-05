import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

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
];

const UpdosTabScreen = () => {
    const [selection, setSelection] = useState(0);
    return (

        <SafeAreaView>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ margin: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24 }}>Updos</Text>
                <Image style={{ width: 28, height: 28, resizeMode: "contain", marginEnd: 20 }} source={require("../../assets/calendarIcon.png")}></Image>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: selection == 0 ? Colors.themeBlue : "white" }]} onPress={() => {
                    setSelection(0)
                }} >
                    <Text style={[styles.btnTitleStyle, { color: selection == 0 ? "white" : "black", fontFamily: selection == 0 ? Custom_Fonts.Montserrat_SemiBold : Custom_Fonts.Montserrat_Regular }]}>Upcoming</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: selection == 1 ? Colors.themeBlue : "white" }]} onPress={() => {
                    setSelection(1)
                }} >
                    <Text style={[styles.btnTitleStyle, { color: selection == 1 ? "white" : "black", fontFamily: selection == 1 ? Custom_Fonts.Montserrat_SemiBold : Custom_Fonts.Montserrat_Regular }]}>Past</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: selection == 2 ? Colors.themeBlue : "white" }]} onPress={() => {
                    setSelection(2)
                }} >
                    <Text style={[styles.btnTitleStyle, { color: selection == 2 ? "white" : "black", fontFamily: selection == 2 ? Custom_Fonts.Montserrat_SemiBold : Custom_Fonts.Montserrat_Regular }]}>Cancelled</Text>
                </TouchableOpacity>

            </View>

            <FlatList
            style = {{marginBottom:100}}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={Item}
                keyExtractor={item => item.id}
            />


        </SafeAreaView>
    )
}

export default UpdosTabScreen

const Item = ({ item }) => (
    <View style={{ backgroundColor: "white", borderRadius: 16, height: 340, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
        <ImageBackground style={{ height: 180, resizeMode: "stretch" }} source={require("../../assets/dummy.png")}>
            <View style={styles.ratingViewStyle} onPress={() => {
                //     navigation.navigate('HomeTabScreen')
            }} >
                <Text style={[styles.btnTitleStyle, { color: "white" }]}>Scheduled</Text>
            </View>
        </ImageBackground>
        <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 22 }}>July 5, 4:00pm</Text>
        <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 16, marginTop: 12 }}>Haircut</Text>
            <View style={{ backgroundColor: "#F0B752", marginLeft: 16, borderRadius: 12, height: 24, marginTop: 12, alignContent: "center", justifyContent: "center" }}><Text style={{ marginHorizontal: 8 }}>+2</Text></View>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 16, marginTop: 12 }}>with Juliana</Text>
            <Image style={{ width: 24, height: 24, resizeMode: "contain", position: "absolute", end: 12, alignSelf: "center" }} source={require("../../assets/rightArrow.png")} />
        </View>
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginLeft: 16, marginTop: 12 }}>$159.50 due at time of service</Text>

    </View>
);

const CompleteItem = ({ item }) => (
    <View style={{backgroundColor: "white", borderRadius: 16, height: 190, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
       <View style = {{flexDirection:"row"}}>
      
      <Image  style = {{resizeMode:"stretch",width:90,height:90,borderRadius:45,marginHorizontal:12,marginVertical:4}} source = {require("../../assets/dummy.png")}></Image>
      <View>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17 }}>Juliana Baker</Text>
      <Text style={{ marginLeft: 16, marginTop: 4, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 14 }}>July 8 at 4:00pm</Text>
      <Text style={{ marginLeft: 16, marginTop: 4, fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 14 }}>Total: $145.75</Text>
      </View>
       </View>
       <TouchableOpacity style={[styles.btnViewStyle,{backgroundColor:Colors.blueText,marginTop:30}]} onPress={() => {
     //     navigation.navigate('HomeTabScreen')
        }} >
          <Text style={[styles.btnTitleStyle,{color:"white",fontFamily: Custom_Fonts.Montserrat_SemiBold}]}>Complete Payment</Text>
        </TouchableOpacity>

    </View>
);

const styles = StyleSheet.create({
    btnViewStyle: {
        height: 36,
        margin: 12,
        borderRadius: 25,
        justifyContent: "center"
    }
    ,
    btnTitleStyle: {
        alignSelf: "center",
        marginHorizontal: 12,
        fontSize: 15
    },
    ratingViewStyle: {
        width: "35%",
        height: 32,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        marginTop: 16,
        justifyContent: "center"
    },

});