import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useSelector } from "react-redux"
import {  useFocusEffect } from '@react-navigation/native';
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window');
import SignInForDetailScreen from '../BeforeRegisterScreens/SignInForDetailScreen'
import { getSavedProviders } from "../../apiSauce/HttpInteractor";
import Toast from 'react-native-simple-toast';
import { Constants } from "../../Constants/Constants";
import { getDistance } from 'geolib';


const SavedTabScreen = ({ navigation }) => {
    const token = useSelector(state => state.userReducer.token)
    const auth = useSelector(state => state.userReducer.auth)
    const location = useSelector(state => state.userReducer.location)
    const [providersData, setProvidersData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            if (auth){
            getSavedProviders(token).then(response => {
                if (response.ok) {
                    if (response.data?.status === true) {
                        setProvidersData(response.data.data)
                    }
                    else {
                        setProvidersData([])
                        Toast.show(response.data.message)
                    }
                } else {
                    setProvidersData([])
                    Toast.show(response.problem)
                }
            });}
         
          return () => {
            //unfocused
          };
        }, [])
      );

    var ServiceView = (data) => {
        return (
            <View style={{ height: 24, borderRadius: 15, borderColor: "black", borderWidth: 1, marginHorizontal: 30, marginVertical: 4, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ marginHorizontal: 16 }}>{data.item.service_id.service_name}</Text>
            </View>)
    }

    const Item = ({ item }) => (

        <TouchableOpacity activeOpacity={0.8} onPress={() => {
            navigation.navigate('UpdoerProfile', { data: item.provider_id })
        }} style={{ width: width * 0.42, backgroundColor: "white", overflow: "hidden", borderRadius: 16, height: 260, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
            <Image style={{ resizeMode: "cover", width: 80, height: 80, borderRadius: 40, marginHorizontal: 12, marginTop: 8, alignSelf: "center" }} source={(item.provider_id?.profile_pic != "") ? { uri: Constants.IMG_BASE_URL + item.provider_id?.profile_pic } : require("../../assets/dummy.png")} />
            {/* <View style={styles.ratingViewStyle} onPress={() => {
            //     navigation.navigate('HomeTabScreen')
        }} >
            <Text style={styles.btnTitleStyle}>4.6 * (17+)</Text>
        </View>  */}
            <Text style={{ marginTop: 8, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, alignSelf: "center" }}>{item.provider_id?.name}</Text>
            <FlatList
                style={{ marginTop: 8 }}
                showsHorizontalScrollIndicator={false}
                data={item.provider_id?.services}
                renderItem={ServiceView}
                keyExtractor={item => item.service_id}
            />
            <View style={{ flexDirection: "row", alignItems: "center", position: "absolute", bottom: 20, width: width * 0.42 }}>
                <Image style={{ width: 16, height: 16, resizeMode: "contain", marginLeft: 8 }} source={require("../../assets/navPin.png")} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 10 }}>{Math.round((getDistance(
                    { latitude: Number(location.lat), longitude: Number(location.lon) },
                    { latitude: Number(item.provider_id?.address.lat), longitude: Number(item.provider_id?.address.lon)}
                ) / 1000) * 0.621371)} miles away</Text>
                <Image style={{ width: 44, height: 44, resizeMode: "contain", position: "absolute", end: 0 }} source={require("../../assets/sav.png")} />
            </View>
        </TouchableOpacity>
    );


    return (
        auth ?
            <View style={{ backgroundColor: "white", height: "100%" }}>
                <SafeAreaView>
                    <View style={{ backgroundColor: "white" }}>
                        <Text style={{ margin: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24 }}>Saved</Text>

                        <FlatList
                            style={{ marginBottom: 100 }}
                            horizontal={false}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            data={providersData}
                            renderItem={Item}
                            keyExtractor={item => item.provider_id?._id}
                        />
                    </View>
                </SafeAreaView></View> : < SignInForDetailScreen title="Saved" descrip="Sign in and start planning your updo: As you search, tap the hear icon to save your favorite updoers and services. " />
    )
}




export default SavedTabScreen



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
    }
});
