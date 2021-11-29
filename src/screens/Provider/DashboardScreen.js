import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput, Dimensions, ImageBackground } from "react-native";
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
const { width, height } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
    const auth = useSelector(state => state.userReducer.auth)
    const userData = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    const [user, setUserData] = useState(userData)
    const [clients, setClients] = useState()
    const [loading, setLoading] = useState(false)
    const DATA = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    const FOLLOWDATA = [require('../../assets/instaIcon.png'), require('../../assets/facebook.png'), require('../../assets/twitterIcon.png'), require('../../assets/spotifyIcon.png'), require('../../assets/youtubeIcon.png'), require('../../assets/linkedin.png')];
    const PODCASTDATA = [require('../../assets/podCast.png'), require('../../assets/journal.png'), require('../../assets/store.png')];

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


    const ProgressItem = ({ item, index }) => {
        return (
            <View style={{ borderColor: "grey", borderLeftWidth: 0.2, borderTopWidth: 0.2, width: (width * 0.75) / 8, height: 60, backgroundColor: '#00A8E0', opacity: item, borderBottomLeftRadius: index == 0 ? 3 : 0, borderTopLeftRadius: index == 0 ? 3 : 0 }} />
        );
    }


    const FollowItem = ({ item, index }) => {
        return (
            <View style={{ width: 80, height: 70, backgroundColor: Colors.blueText, borderRadius: 8, marginRight: 12, justifyContent: "center" }} >
                <Image style={{ width: 48, height: 48, alignSelf: "center", resizeMode: "contain" }} source={item} />
            </View>
        );
    }

    const podCastItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ height: 180, width: '70%' }} onPress={() => {
                navigation.navigate('TipTopPodcast')
            }} >
                <Image source={require('../../assets/podCast.png')} style={{ height: 180, width: '100%', resizeMode: "contain" }} />
            </TouchableOpacity>
        );
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('ClientDetail', {customerId:item._id})
        }} style={{ width: "42%", backgroundColor: "white", borderRadius: 16, height: 250, margin: 16, shadowColor: "black", shadowOpacity: 0.4, elevation: 6, shadowOffset: { width: 0, height: 1 } }}>
            <Image style={{ resizeMode: "cover", width: 80, height: 80, borderRadius: 40, marginHorizontal: 12, marginTop: 8, alignSelf: "center" }} source={(item.profile_pic != "") ? { uri: Constants.IMG_BASE_URL + item.profile_pic } : require("../../assets/dummy.png")}></Image>
            <View style={styles.ratingViewStyle} onPress={() => {
                //     navigation.navigate('HomeTabScreen')
            }} >
                <Text style={styles.btnTitleStyle}>Since {moment.unix(item.created_on).format('yyyy')}</Text>
            </View>
            <Text style={{ marginTop: 8, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: "center" }}>{item.name}</Text>
            <View style={{ padding: 8, flexDirection: "row", marginTop: 8 }}>
                <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../../assets/calIcon.png")} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 9, color: 'black', marginLeft: 6, alignSelf: "center" }}>Last Seen: </Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 9, color: 'black', alignSelf: "center" }}>{moment.unix(item.created_on).format('MMM DD yyyy')}</Text>
            </View>
            <TouchableOpacity style={{ padding: 8, flexDirection: "row" }} onPress={() => {
                navigation.navigate('MessageScreen', { key: item._id + '_' + userData._id, chatHeader: item.name, toID: item._id })
            }} >
                <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../../assets/msgIcon.png")} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 9, color: 'black', marginLeft: 6, alignSelf: "center" }}>Message </Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 9, color: 'black', alignSelf: "center" }}>{item.name}</Text>
            </TouchableOpacity>
            <View style={{ padding: 8, flexDirection: "row" }}>
                <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../../assets/dollerIcon.png")} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 9, color: 'black', marginLeft: 6, alignSelf: "center" }}>Revenue: </Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 9, color: 'black', alignSelf: "center" }}>${item.revenue}</Text>
            </View>
        </TouchableOpacity>
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
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 32, alignSelf: "center", marginTop: 25, color: Colors.blueText }}>TipTop</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 18, alignSelf: "center", marginTop: 16, color: Colors.blueText }}>the highest point of excellence</Text>
                        <View style={{ height: 1, backgroundColor: Colors.blueText, marginVertical: 25 }} />
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 28, alignSelf: "center", color: Colors.blueText }}>{user.total_updos} Updos</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 22, alignSelf: "center", marginTop: 8, color: Colors.blueText }}>{resolutionTime}</Text>

                        <View style={{ flexDirection: "row", alignSelf: "center", height: 100, marginTop: 20 }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Pipeline</Text>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 18, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>${user.pending_earnings}</Text>
                            </View>
                            <View style={{ width: 1, backgroundColor: 'grey', height: 60, alignSelf: "center" }} />
                            <View style={{ width: '45%' }}>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Available</Text>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 18, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>${user.total_earnings}</Text>
                            </View>
                        </View>
                        <View style={{ width: '75%', backgroundColor: '#C4C4C4', height: 1.5, alignSelf: "center" }} />
                        <View style={{ width: '45%', alignSelf: 'center', marginVertical: 16 }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: "center", color: Colors.blueText }}>Total Earnings</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 18, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>${user.total_earnings + user.pending_earnings}</Text>
                        </View>
                        <View style={{ width: '75%', backgroundColor: '#C4C4C4', height: 1.5, alignSelf: "center" }} />
                        <TouchableOpacity style={{ width: '75%', height: 80, flexDirection: "row", alignSelf: "center" }} onPress={() => {
                            navigation.navigate('EarningScreen')
                        }} >
                            <Image source={require("../../assets/funds.png")} style={{ height: 31, width: 27, alignSelf: "center" }} />
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: "center", color: Colors.blueText, marginHorizontal: 20 }}>More</Text>
                            <Image style={{ resizeMode: "contain", width: 10, height: 20, position: "absolute", end: 0, top: 32 }} source={require("../../assets/rightArrow.png")}></Image>
                        </TouchableOpacity>
                        <View style={{ width: '75%', backgroundColor: '#C4C4C4', height: 1.5, alignSelf: "center" }} />

                        <View style={{ width: '92%', alignSelf: "center", backgroundColor: Colors.blueText, borderRadius: 12, marginVertical: 20 }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 18, alignSelf: "center", color: 'white', marginVertical: 12 }}>My TipTop Rewards</Text>
                            <View style={{ height: 80, backgroundColor: 'white', borderRadius: 12, marginHorizontal: 6, marginBottom: 12, justifyContent: "center" }}>
                                <View style={{ height: 60, width: '100%', overflow: 'hidden', flexDirection: 'row', marginBottom: 3 }}>
                                    <FlatList
                                        style={{ marginLeft: 8 }}
                                        horizontal={true}
                                        scrollEnabled={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={DATA}
                                        renderItem={ProgressItem}
                                        keyExtractor={item => item.id}
                                    />

                                    <View style={{ width: (width * 0.8) / 8, borderColor: '#03409D', borderWidth: 2, height: 60, justifyContent: "center", alignItems: "center", marginRight: 8, borderBottomRightRadius: 3, borderTopRightRadius: 3 }}>
                                        <Image source={require('../../assets/logoSmall.png')} style={{ height: 21, width: 24 }} />
                                    </View>
                                </View>
                            </View>

                        </View>

                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 22, color: 'black', marginVertical: 12, marginLeft: 8 }}>We’re all tiptop</Text>
                        <FlatList
                            style={{ marginLeft: 2, marginVertical: 30 }}
                            horizontal={true}
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            data={PODCASTDATA}
                            renderItem={podCastItem}
                            keyExtractor={item => item.id}
                        />
                       
                        <FlatList
                            style={{ marginLeft: 2, marginVertical: 30 }}
                            horizontal={true}
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            data={FOLLOWDATA}
                            renderItem={FollowItem}
                            keyExtractor={item => item.id}
                        />


                        <View style={{ width: '94%', alignSelf: "center", backgroundColor: Colors.blueText, borderRadius: 12, marginVertical: 20 }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 22, color: 'white', marginVertical: 40, alignSelf: "center" }}>Share your story!</Text>
                            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                                <Image source={require('../../assets/podcastIcon.png')} style={{ width: 92, height: 72, resizeMode: "contain" }} />
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 20, color: 'white', alignSelf: "center", marginLeft: 15 }}>the tiptop podcast</Text>
                            </View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16, color: 'white', alignSelf: "center", marginHorizontal: 15, marginTop: 40, textAlign: 'center' }}>We want to feature you on the Tiptop Podcast!</Text>
                            <TouchableOpacity style={{ height: 45, backgroundColor: "white", width: "65%", alignSelf: "center", borderRadius: 22, justifyContent: "center", marginVertical: 25 }} onPress={() => {
                               navigation.navigate('PartnerWithUs',{isGrow:true})
                            }} >
                                <Text style={{
                                    alignSelf: "center",
                                    color: Colors.blueText,
                                    fontSize: 15,
                                    fontFamily: Custom_Fonts.Montserrat_SemiBold
                                }}>Let’s Chat</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '94%', alignSelf: "center", backgroundColor: Colors.blueText, borderRadius: 12, marginVertical: 20, overflow: "hidden" }} >
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 22, color: 'white', marginVertical: 16, alignSelf: "center" }}>Grow the TipTop Community</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 14, color: 'white', alignSelf: "center", marginHorizontal: 15, textAlign: 'center' }}>Know someone who would make a great client on TipTop? A future TipTopper?{'\n\n'}We can’t wait to meet them!</Text>
                            <ImageBackground style={{ width: '100%', height: 300, alignSelf: "center", marginTop: 20 }} source={require("../../assets/joinBg.png")}>
                                <TouchableOpacity style={{ height: 40, backgroundColor: "white", width: "50%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: 20 }} onPress={() => {
                                    navigation.navigate('InviteFriends')
                                }} >
                                    <Text style={{
                                        alignSelf: "center",
                                        color: Colors.blueText,
                                        fontSize: 15,
                                        fontFamily: Custom_Fonts.Montserrat_SemiBold
                                    }}>Invite a Friend!</Text>
                                </TouchableOpacity>
                            </ImageBackground>

                        </View>



                        <View style={{ backgroundColor: 'white' }}>
                            <View style={styles.pickerStyle} >
                                <Image style={{ width: 16, height: 16, tintColor: 'black', marginLeft: 16 }} source={require("../../assets/searchBtn.png")} />
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



const styles = StyleSheet.create({
    pickerStyle: {
        width: "90%",
        flexDirection: "row",
        height: 44,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 25,
        alignItems: "center",
        alignSelf: "center",
        elevation: 8,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 4 }
    },
    pickerTitleStyle: {
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Medium,
        marginLeft: 8, textAlign: "center", width: '80%'

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
