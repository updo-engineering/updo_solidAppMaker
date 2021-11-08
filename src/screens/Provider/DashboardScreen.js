import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { useSelector } from "react-redux";
import SignInForDetailScreen from '../BeforeRegisterScreens/SignInForDetailScreen';
import moment from 'moment';
import { refreshToken, getProviderDetail } from "../../apiSauce/HttpInteractor";
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { SetToken, SetUser } from '../../Redux/userDetail';
import Loader from '../../Components/loader';
import { Constants } from "../../Constants/Constants";
import { useFocusEffect } from '@react-navigation/native';

const DashboardScreen = ({ navigation }) => {
    const auth = useSelector(state => state.userReducer.auth)
    const userData = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    const [user, setUserData] = useState(userData)
    const [clients, setClients] = useState()
    const [loading, setLoading] = useState(false)
    let resolutionTime = moment().unix() - userData.created_on
    if (resolutionTime < 60) {
        resolutionTime = Math.round(resolutionTime) + " Second"
    }
    else if ((resolutionTime / 60) < 60) {
        resolutionTime = Math.round((resolutionTime / 60)) + " Minute"
    }
    else if (((resolutionTime / 60) / 60) < 24) {
        resolutionTime = Math.round(((resolutionTime / 60) / 60)) + " Hour"
    }
    else if ((((resolutionTime / 60) / 60) / 24) < 30) {
        resolutionTime = Math.round(((resolutionTime / 60) / 60) / 24) + " Day"
    }
    else if (((((resolutionTime / 60) / 60) / 24) / 30) < 12) {
        resolutionTime = Math.round((((resolutionTime / 60) / 60) / 24) / 30) + " Month"
    }
    else {
        resolutionTime = Math.round(((((resolutionTime / 60) / 60) / 24) / 30) / 12) + " Year"
    }
    useFocusEffect(
        React.useCallback(() => {
            if (auth) {
                setLoading(true)
                refreshToken('Provider', userData._id).then(response => {
                    console.log(response)
                    if (response.ok) {
                        setLoading(false)
                        if (response.data?.status === true) {
                            dispatch(SetToken(response.data.data.token))
                            setLoading(true)
                            getProviderDetail(response.data.data.token).then(response => {
                                if (response.ok) {
                                    setLoading(false)
                                    if (response.data?.status === true) {
                                        dispatch(SetUser(response.data.data))
                                        setUserData(response.data.data)
                                        setClients(response.data?.data?.my_clients)
                                    }
                                    else {
                                        setLoading(false)
                                        Toast.show(response.data.message)
                                    }
                                } else {
                                    setLoading(false)
                                    Toast.show(response.problem)
                                }
                            }).catch((error) => Toast.show(error.message));
                        }
                        else {
                            setLoading(false)
                            Toast.show(response.data.message)
                        }
                    } else {
                        setLoading(false)
                        Toast.show(response.problem)
                    }
                }).catch((error) => Toast.show(error.message));
            }
        }, [])
    );



    return (
        auth ?
            <View style={{ flex: 1, backgroundColor: "white", height: "100%" }}>
                <ScrollView
                    style={{ width: "100%", height: "100%" }}
                    horizontal={false}
                    scrollEventThrottle={16}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <SafeAreaView>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 28, alignSelf: "center", marginTop: 25, color: Colors.blueText }}>My Updo Dashboard</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 27, alignSelf: "center", marginTop: 22, color: Colors.blueText }}>{user.total_updos} Updos</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 18, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>{resolutionTime}</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: "center", marginTop: 40, color: Colors.blueText }}>My Balance</Text>

                        <View style={{ flexDirection: "row", alignSelf: "center", height: 100, marginTop: 8 }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Available</Text>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 17, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>$ {user.total_earnings}</Text>
                            </View>
                            <View style={{ width: 1, backgroundColor: 'grey', height: 60, alignSelf: "center" }} />
                            <View style={{ width: '45%' }}>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Pending</Text>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 17, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>$ {user.pending_earnings}</Text>
                            </View>

                        </View>

                        <View style={{ height: 200, marginTop: 20, backgroundColor: Colors.themeBlue }}>
                            <Image style={{ width: 100, height: 100, alignSelf: "center", marginVertical: 20 }} source={require("../../assets/mail.png")}></Image>

                            <TouchableOpacity style={{ height: 40, backgroundColor: "white", width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center" }} onPress={() => {
                                navigation.navigate('InviteFriends')
                            }} >
                                <Text style={{
                                    alignSelf: "center",
                                    color: Colors.themeBlue,
                                    fontSize: 15,
                                    fontFamily: Custom_Fonts.Montserrat_SemiBold
                                }}>Invite a Friend!</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ backgroundColor: Colors.blueText }}>
                            <View style={styles.pickerStyle} >
                                <Image style={{ width: 16, height: 16, tintColor: 'black' }} source={require("../../assets/searchBtn.png")} />
                                <TextInput style={styles.pickerTitleStyle} placeholder='My Clients' placeholderTextColor='black' onChangeText={(t) => {
                                    if (t == '') {
                                        setClients(user?.my_clients)
                                    }
                                    else {
                                        setClients(user?.my_clients.filter((data) => data.name.toLowerCase().includes(t.toLowerCase())))
                                    }
                                }} />
                            </View>

                            <FlatList
                                style={{ marginBottom: 100 }}
                                horizontal={false}
                                scrollEnabled={false}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                data={clients}
                                renderItem={Item}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        {loading && <Loader />}
                    </SafeAreaView>
                </ScrollView>
            </View> : < SignInForDetailScreen title="Dashboard" descrip="Sign in and start planning your updo: As you search, tap the hear icon to save your favorite updoers and services. " />
    );
}

export default DashboardScreen

const Item = ({ item }) => (
    <View style={{ width: "42%", backgroundColor: "white", borderRadius: 16, height: 250, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
        <Image style={{ resizeMode: "cover", width: 80, height: 80, borderRadius: 40, marginHorizontal: 12, marginTop: 8, alignSelf: "center" }} source={(item.profile_pic != "") ? { uri: Constants.IMG_BASE_URL + item.profile_pic } : require("../../assets/dummy.png")}></Image>
        <View style={styles.ratingViewStyle} onPress={() => {
            //     navigation.navigate('HomeTabScreen')
        }} >
            <Text style={styles.btnTitleStyle}>Since {moment.unix(item.created_on).format('yyyy')}</Text>
        </View>
        <Text style={{ marginTop: 8, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 16, alignSelf: "center" }}>{item.name}</Text>
        <View style={{ padding: 8, flexDirection: "row", marginTop: 8 }}>
            <Image style={{ width: 20, height: 20, resizeMode: "contain", tintColor: Colors.themeBlue }} source={require("../../assets/calendarIcon.png")} />
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 9, color: 'black', marginLeft: 6, alignSelf: "center" }}>Joined at: </Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 9, color: 'black', alignSelf: "center" }}>{moment.unix(item.created_on).format('MMM DD yyyy')}</Text>
        </View>
        <View style={{ padding: 8, flexDirection: "row" }}>
            <Image style={{ width: 20, height: 20, resizeMode: "contain", tintColor: Colors.themeBlue }} source={require("../../assets/msg.png")} />
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 9, color: 'black', marginLeft: 6, alignSelf: "center" }}>Message </Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 9, color: 'black', alignSelf: "center" }}>{item.name}</Text>
        </View>
        <View style={{ padding: 8, flexDirection: "row" }}>
            <Image style={{ width: 20, height: 20, resizeMode: "contain", tintColor: Colors.themeBlue }} source={require("../../assets/doller.png")} />
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 9, color: 'black', marginLeft: 6, alignSelf: "center" }}>Revenue: </Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 9, color: 'black', alignSelf: "center" }}>${item.revenue}</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    pickerStyle: {
        width: "90%",
        flexDirection: "row",
        height: 44,
        margin: 20,
        borderColor: "black",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    pickerTitleStyle: {
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Regular,
        marginLeft: 8,

    },
    ratingViewStyle: {
        width: "45%",
        height: 24,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: -15
    },
    btnViewStyle: {
        width: "55%",
        height: 30,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        justifyContent: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 10,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
});
