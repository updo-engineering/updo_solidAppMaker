import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useSelector } from "react-redux"
import { useFocusEffect } from '@react-navigation/native';
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window');
import ConfirmedPopup from '../../Helper/ConfirmedPopup'
import { getSavedProviders, saveProvider } from "../../apiSauce/HttpInteractor";
import Toast from 'react-native-simple-toast';
import { Constants } from "../../Constants/Constants";


const SavedTabScreen = ({ navigation }) => {
    const token = useSelector(state => state.userReducer.token)
    const auth = useSelector(state => state.userReducer.auth)
    const user = useSelector(state => state.userReducer.user)
    const [providersData, setProvidersData] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [id, setId] = useState();
    useFocusEffect(
        React.useCallback(() => {
            if (auth) {
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
                });
            }

            return () => {
                //unfocused
            };
        }, [])
    );


    const Item = ({ item }) => (

        <View
            //activeOpacity={0.8} 
            // onPress={() => {
            //     navigation.navigate('UpdoerProfile', { data: item.provider_id })
            // }}
            style={{ width: width * 0.43, backgroundColor: "#F1FBFF", overflow: "hidden", borderRadius: 16, margin: 12, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
            <Image style={{ resizeMode: "cover", width: 80, height: 80, borderRadius: 40, marginHorizontal: 12, marginTop: 8, alignSelf: "center" }} source={(item.provider_id?.profile_pic != "") ? { uri: item.provider_id?.profile_pic.includes('https://') ? item.provider_id?.profile_pic : Constants.IMG_BASE_URL + item.provider_id?.profile_pic } : require("../../assets/dummy.png")} />
            <View style={styles.ratingViewStyle} onPress={() => {
                //     navigation.navigate('HomeTabScreen')
            }} >
                <Text style={styles.btnTitleStyle}>{item.provider_id?.avg_rating ?? 0} ✮ (5+)</Text>
            </View>
            <Text style={{ marginTop: 8, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, alignSelf: "center" }}>{item.provider_id?.name}</Text>

            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Image style={{ width: 16, height: 16, resizeMode: "contain", marginLeft: -8 }} source={require("../../assets/navPin.png")} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 13, marginHorizontal: 8 }}>{item?.provider_id?.address?.location}</Text>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between", marginVertical: 16, width: '90%' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    setId(item?.provider_id._id)
                    setPopupVisible(true)
                }}>
                    <Image style={{ width: 38, height: 38, resizeMode: "contain" }} source={require("../../assets/save.png")} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    navigation.navigate('SchduleScreen', { providerID: item?.provider_id?._id, providerName: item?.provider_id?.name, providerImg: item?.provider_id?.profile_pic.includes('https://') ? item?.provider_id?.profile_pic : Constants.IMG_BASE_URL + item?.provider_id?.profile_pic })
                }}>
                    <Image style={{ width: 38, height: 38, resizeMode: "contain" }} source={require("../../assets/cal.png")} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    navigation.navigate('MessageScreen', { key: user._id + '_' + item?.provider_id?._id, chatHeader: item?.provider_id?.name, toID: item?.provider_id?._id })
                }}>
                    <Image style={{ width: 38, height: 38, resizeMode: "contain" }} source={require("../../assets/fabMsg.png")} />
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
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
            </SafeAreaView>
            <ConfirmedPopup
                isVisible={popupVisible}
                onBackdropPress={() => setPopupVisible(false)}
                isConfirm={() => {
                    setPopupVisible(false)
                    saveProvider(id, token).then(response => {
                        if (response.ok) {
                            if (response.data?.status === true) {
                                Toast.show(response.data.message)
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
                                });
                            }
                            else {
                                Toast.show(response.data.message)
                            }
                        } else {
                            Toast.show(response.problem)
                        }
                    })
                }}
            />
        </View>
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
        marginHorizontal: 6,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    ratingViewStyle: {
        height: 24,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: -15
    }
});
