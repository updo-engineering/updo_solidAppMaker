import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Image, ScrollView, FlatList, Dimensions } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { getDetails } from "../apiSauce/HttpInteractor";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
import { Constants } from "../Constants/Constants";

const ClientDetail = (props) => {
    const token = useSelector(state => state.userReducer.token)
    const user = useSelector(state => state.userReducer.user)
    let id = props.route.params?.customerId
    let isMyProfile = props.route.params?.isMyProfile ??  false
    const [userData, setUserData] = useState()
    const getCustomerData = () => {
        getDetails('Customer', id, user._id, token).then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    setUserData(response.data.data)
                }
                else {
                    Toast.show(response.data.message)
                }
            } else {

                Toast.show(response.problem)
            }
        });
    }

    const SlidingImg = ({ item }) => (
        <View style={{
            height: 220,
            width: width - 24, alignItems: "center"
        }}>
            <View style={{
                height: 220,
                width: width - 24,
                borderRadius: 16,
                justifyContent: "center", elevation: 3,
                shadowColor: "grey", shadowOpacity: 0.4,
                shadowOffset: { width: 0, height: 1 }
            }}>
                <Image style={{
                    height: 220,
                    width: width - 24, resizeMode: "stretch", borderRadius: 16
                }} source={item.image_link != "" ? { uri: Constants.IMG_BASE_URL + item.image_link } : require("../assets/dummy.png")} />
            </View>
        </View>
    );


    useEffect(() => {
        { user.user_type == 'Customer' ? setUserData(user) : getCustomerData() }

    }, [])


    return (
        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title={isMyProfile ? "My Profile" : "Client Profile"} />

                <View style={{
                    margin: 10, backgroundColor: 'white', elevation: 8, shadowColor: "black",
                    shadowOpacity: 0.6, borderRadius: 12,
                    shadowOffset: { width: 0, height: 1 }, overflow: "hidden"
                }}>
                    <View style={{ flexDirection: 'row', height: 80, padding: 8 }}>
                        <View style={{ flexDirection: 'row', width: '58%' }}>
                        <Image style={{ width: 68, height: 66, resizeMode: "cover", borderRadius: 38,borderColor: "black",borderWidth:0.2}} source={user.profile_pic == "" ? require(".//../assets/dummy.png") : { uri: (user?.profile_pic ?? '').includes('https://') ? user.profile_pic : Constants.IMG_BASE_URL + user.profile_pic }} />
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 21, color: 'black', alignSelf: "center", marginHorizontal: 8 }}>{userData?.name.split(' ')[0] + " "+(userData?.name.split(' ').length > 1 ?  userData?.name.split(' ')[1].charAt(0).toUpperCase()+'.' : '')}</Text>
                        </View>
                        <View style={{ marginTop: 8, marginHorizontal: 12 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../assets/star.png")} />
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 13, marginHorizontal: 2 }}>Since {moment.unix(userData?.created_on).format('yyyy')}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../assets/navPin.png")} />
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 13, marginHorizontal: 2 }}>{(userData?.address?.location ?? '') == '' ? '' : userData?.address?.location.split(",").slice(-3)[0].trim() + "," + userData?.address?.location.split(",").slice(-1)[0].trim()}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: 'white', borderRadius: 12, elevation: 8, width: '100%', marginTop: 20, shadowColor: "black",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 1 }
                    }}>
                        <View style={{ height: 56, backgroundColor: Colors.themeBlue, padding: 16 }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, color: 'white' }}>About {userData?.name}</Text>
                        </View>
                        <View style={{ padding: 16 }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, color: 'black' }}>{userData?.about_me}</Text>
                        </View>
                    </View>

                    <FlatList
                        style={{ marginTop: 20, marginBottom: 12 }}
                        horizontal={true}
                        scrollEnabled={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={userData?.images}
                        renderItem={SlidingImg}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={{ backgroundColor: 'white', borderRadius: 12, elevation: 8, margin: 12, marginTop: 20, shadowColor: "black",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 1 } }}>
                    <View style={{ height: 56, backgroundColor: Colors.themeBlue, padding: 16 }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, color: 'white' }}>Trophy Case</Text>
                    </View>
                    <View style={{ padding: 16, flexDirection: "row" }}>

                        <View style={{ width: 100 }}>
                            <View style={{ width: 70, height: 70, borderRadius: 8, backgroundColor: Colors.blueText, justifyContent: "center", alignSelf: "center" }}>
                                <Image source={require('../assets/bulb.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                            </View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 10, color: 'black', textAlign: 'center', alignSelf: "center", marginTop: 8 }}>Early Adopter</Text>
                        </View>

                        <View style={{ width: 80 }}>
                            <View style={{ width: 70, height: 70, borderRadius: 8, backgroundColor: Colors.blueText, justifyContent: "center", marginLeft: 20, alignSelf: "center" }}>
                                <Image source={require('../assets/mansion.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                            </View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 10, color: 'black', textAlign: 'center', alignSelf: "center", marginLeft: 20, marginTop: 8 }}>Madison</Text>
                        </View>

                    </View>
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}

export default ClientDetail
