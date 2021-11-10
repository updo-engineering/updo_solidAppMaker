import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, TextInput, Image, FlatList, ScrollView, Keyboard,RefreshControl } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "../screens/TopHeader/TopHeaderView";
import { useSelector } from "react-redux";
import Toast from 'react-native-simple-toast';
import Loader from '../Components/loader';
import _ from 'lodash'
import { getSavedCards } from "../apiSauce/HttpInteractor";
import moment from 'moment'
import { Constants } from "../Constants/Constants";
import CustomModal from "../Components/CustomModal";
import BluePopUp from "../Components/BluePopUp";
import { completePayment, generatePaymentIntent, reviewAppointment } from "../apiSauce/HttpInteractor";
import { useStripe } from '@stripe/stripe-react-native';

const DATA = [
    {
        id: 0,
        title: 'Cash Tip'
    },
    {
        id: 10,
        title: '10%'
    },
    {
        id: 15,
        title: '15%'
    },
    {
        id: 20,
        title: '20%'
    }
    ,
    {
        id: 786,
        title: '+'
    }
];

const CompletePaymentPage = (props) => {
    const [loading, setLoading] = useState(false)
    const appointment = props.route.params.appointment
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    const [cards, setCards] = useState([]);
    const defaultCardID = useSelector(state => state.userReducer.defaultCardID)
    const [msg, setMsg] = useState("")
    const [experience, setExperience] = useState({ 'resp': '', 'point': 0 })
    const [would_use_again, setWould_use_again] = useState({ 'resp': '', 'point': 0 })
    const [recommend, setRecommend] = useState({ 'resp': '', 'point': 0 })
    const [tip, setTip] = useState();
    const [isReviewed, setReviewed] = useState(appointment.is_reviewed);
    const [typevisible, setTypeVisible] = useState(false)
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [popupVisible, setPopupVisible] = useState(false)
    const [titleStr, setTitleStr] = useState(false)
    const [popUpMsg, setPopUpMsg] = useState(false)
    useEffect(() => {
        //getCards()
    }, [])

    const getCards = () => {
        setLoading(true);
        getSavedCards(token).then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    setLoading(false);
                    setCards(response.data.data.data)
                    let card = response.data?.data.data.filter((data) => data._id === defaultCardID)
                }
                else {
                    setLoading(false);
                    setCards([])
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                setCards([])
                Toast.show(response.problem)
            }
        });
    }

    const initializePaymentSheet = async (paymentIntent, ephemeralKey) => {
        const { error } = await initPaymentSheet({
            customerId: user._id,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
        });
        if (!error) {
            setLoading(false)
            let x = await openPaymentSheet(paymentIntent)
            console.log(x)

        } else {
            Toast.show(error.message)
            setLoading(false)
        }
    };

    const openPaymentSheet = async (paymentIntent) => {
        try {
            console.log(paymentIntent, 'intent')
            const { error } = await presentPaymentSheet({ clientSecret: paymentIntent })

            if (error) {
                setLoading(false)
                Toast.show(error.message)
            } else {
                props.navigation.goBack()
            }
        }
        catch (err) {
            console.log(err)
        }
    };


    const Item = (item, index) => (
        <View >
            <FlatList
                style={{ marginBottom: 8 }}
                horizontal={false}
                data={item.sub_services}
                renderItem={(itemData) => {
                    return (SubServiceItem(itemData.item, itemData.index, index))
                }}
                scrollEnabled={false}
                keyExtractor={item => item.id}
            />
        </View>
    );

    const SubServiceItem = (item, index, parentindex) => {
        return (
            <View style={{
                margin: 8, backgroundColor: 'white', borderRadius: 16, elevation: 4, shadowColor: "grey",
                shadowOpacity: 0.4,
                shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
            }}>
                <View
                    style={{
                        flexDirection: "row", paddingHorizontal: 16, marginVertical: 25
                    }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14, width: '80%' }}>{item.service_name}</Text>

                    <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14 }}>$ {item.service_total}</Text>
                </View>
            </View>
        );
    }

    const AdditionalItem = ({ item, index }) => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row", paddingHorizontal: 8, marginVertical: 8, alignItems: 'center'
                    }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14 }}>{item.charge_name}</Text>

                    {(item.charge_name === 'Service Tax' || item.charge_name === 'Service Fee') ? <TouchableOpacity onPress={() => {
                      if (item.charge_name === 'Service Tax'){
                          setTitleStr('Service Tax')
                          setPopUpMsg('The service tax depends on the US state where you’re located.')
                          setPopupVisible(true)
                      }
                      else{
                        setTitleStr('Service Fee')
                        setPopUpMsg('The team at Updo is completely transparent in how the business makes money. One part of this process is through a small fee. ')
                        setPopupVisible(true)
                      } 
                    }} >
                        <Image style={{ width: 24, height: 24, resizeMode: "contain", marginLeft: 8 }} source={require("../assets/info.png")} />
                    </TouchableOpacity> : null}

                    <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14, position: 'absolute', end: 16 }}>$ {item.charge_amount}</Text>
                </View>
            </View>
        );
    }

    const TipItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ width: 60, height: 51, borderWidth: 1, borderRadius: 8, borderColor: Colors.themeBlue, margin: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: tip?.id == item.id ? Colors.themeBlue : 'white' }} onPress={() => {
                item.id == 786 ? setTypeVisible(true) : null

                setTip({ 'amount': item.id == 786 ? 0 : (item.id * appointment?.proposal_id?.total) / 100, id: item.id })
            }} >
                {
                    item.id === 0 || item.id === 786 ? <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, textAlign: 'center', color: tip?.id == item.id ? 'white' : 'black', fontSize: item.id === 786 ? 24 : 13, marginHorizontal: 4 }}>{item.title}</Text> : <View>
                        <Text style={{ fontFamily: Custom_Fonts.Regular, textAlign: 'center', fontSize: 13, color: tip?.id == item.id ? 'white' : 'black' }}> {item.title}</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, textAlign: 'center', fontSize: 13, color: tip?.id == item.id ? 'white' : 'black' }}>${(item.id * appointment?.proposal_id?.total) / 100}</Text>
                    </View>
                }
            </TouchableOpacity>
        );
    }

    function onAddTip() {
        Keyboard.dismiss()
        setTypeVisible(false)
    }

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            <ScrollView
                style={{ width: "100%", height: "100%" }}
                horizontal={false}
                scrollEventThrottle={16}
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <SafeAreaView>
                    <TopHeaderView title={'Updo with ' + appointment?.provider_id.name} />
                    <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
                        <Image style={{ width: 64, height: 64, resizeMode: "cover", borderRadius: 32 }} source={appointment?.provider_id.profile_pic == '' ? require("../assets/dummy.png") : { uri: Constants.IMG_BASE_URL + appointment?.provider_id.profile_pic }}></Image>
                        <View>
                            <Text style={[styles.btnTitleStyle, { color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>{moment.unix(appointment?.appoint_start).format('dddd, MMMM DD') + " at " + moment.unix(appointment?.appoint_start).format('h:mm a')}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: "contain", marginLeft: 8 }} source={require("../assets/navPin.png")} />
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 15, marginHorizontal: 4 }}>{appointment?.provider_id.address.city}, {appointment?.provider_id.address.state}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        margin: 16, backgroundColor: 'white', borderRadius: 8, elevation: 4, shadowColor: "grey",
                        shadowOpacity: 0.4,
                        flexDirection: "row", alignItems: "center",
                        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey", height: 40
                    }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "#8E8E8E", fontSize: 13, marginHorizontal: 4, width: '50%', textAlign: 'center' }}>Updo ID : {appointment?.proposal_id._id.slice(0, 6).toUpperCase()}</Text>
                        <View style={{ height: 40, width: 1, backgroundColor: '#8E8E8E', opacity: 0.4 }} />
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: Colors.themeBlue, fontSize: 13, marginHorizontal: 4, width: '50%', textAlign: 'center' }}>Completed</Text>
                    </View>

                    {isReviewed === 0 ? <View style={{ borderRadius: 16, backgroundColor: "#18A7C70D", marginHorizontal: 16, borderWidth: 1, borderColor: Colors.themeBlue, marginBottom: 40 }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, marginHorizontal: 20, marginTop: 20 }}>{"Remember to Tip & Review!"}</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, marginHorizontal: 20, marginBottom: 20, marginTop: 12, fontSize: 14 }}>We hope you loved your Updo. Let {appointment.provider_id.name} know how it was, and add gratuity if you choose.</Text>
                        <View style={{ height: 1, backgroundColor: Colors.themeBlue, marginHorizontal: 20 }}></View>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, marginHorizontal: 20, marginTop: 20 }}>Select a tip amount</Text>

                        <FlatList
                            style={{ margin: 16 }}
                            horizontal={true}
                            data={DATA}
                            renderItem={TipItem}
                            keyExtractor={item => item.id}
                        />
                        <View style={{ height: 1, backgroundColor: Colors.themeBlue, marginHorizontal: 20, marginVertical: 20 }}></View>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20 }}>How was your experience?</Text>
                        <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
                            <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                                setExperience({ 'resp': "Good", 'point': 1.5 })
                            }} >
                                <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={experience.resp == 'Good' ? require("../assets/likeHighlight.png") : require("../assets/like.png")}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                                setExperience({ 'resp': "Bad", 'point': 0 })
                            }} >
                                <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={experience.resp == 'Bad' ? require("../assets/dislikeHighlight.png") : require("../assets/dislike.png")}></Image>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20 }}>Would you see {appointment.provider_id.name} again?</Text>
                        <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
                            <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                                setWould_use_again({ 'resp': "Yes", 'point': 1.5 })
                            }} >
                                <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={would_use_again.resp == 'Yes' ? require("../assets/likeHighlight.png") : require("../assets/like.png")}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                                setWould_use_again({ 'resp': "No", 'point': 0 })
                            }} >
                                <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={would_use_again.resp == 'No' ? require("../assets/dislikeHighlight.png") : require("../assets/dislike.png")}></Image>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20 }}>Would you recommend {appointment.provider_id.name} to
                            your friend?</Text>
                        <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
                            <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                                setRecommend({ 'resp': "Yes", 'point': 2 })
                            }} >
                                <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={recommend.resp == 'Yes' ? require("../assets/likeHighlight.png") : require("../assets/like.png")}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                                setRecommend({ 'resp': "No", 'point': 0 })
                            }} >
                                <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={recommend.resp == 'No' ? require("../assets/dislikeHighlight.png") : require("../assets/dislike.png")}></Image>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20, marginVertical: 16 }}>Leave your feedback for {appointment.provider_id.name}</Text>


                        <View style={{ height: 175, borderRadius: 16, backgroundColor: "white", marginHorizontal: 16, borderWidth: 1, borderColor: Colors.themeBlue, padding: 8 }}>
                            <TextInput placeholder={"Please be aware that all feedback is public on " + appointment.provider_id.name + "’s profile."}
                                value={msg}
                                onChangeText={(t) => {
                                    setMsg(t)
                                }} />
                        </View>
                        <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, marginHorizontal: 20, height: 42, marginVertical: 16 }]} onPress={() => {
                            reviewAppointment(token, appointment.provider_id._id, appointment._id, experience.resp, would_use_again.resp, recommend.resp, msg, (experience.point + would_use_again.point + recommend.point)).then(response => {
                                if (response.ok) {
                                    if (response.data?.status === true) {
                                        Toast.show(response.data.message)
                                        setReviewed(true)
                                    }
                                    else {
                                        Toast.show(response.data.message)
                                    }
                                } else {
                                    Toast.show(response.problem)
                                }
                            });

                        }} >
                            <Text style={styles.btnTitleStyle}>Submit</Text>
                        </TouchableOpacity>
                    </View> : null}

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'black', fontSize: 14, marginHorizontal: 20 }}>Your Updo</Text>

                    <FlatList
                        style={{ margin: 8 }}
                        horizontal={false}
                        data={appointment?.proposal_id.services_data}
                        renderItem={(itemData) => Item(itemData.item, itemData.index)}
                        keyExtractor={item => item.id}
                    />

                    <View style={{
                        margin: 8, backgroundColor: 'white', borderRadius: 16, elevation: 4, shadowColor: "grey",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey", padding: 8
                    }}>

                        <FlatList
                            horizontal={false}
                            data={appointment?.proposal_id.additional_charges}
                            renderItem={AdditionalItem}
                            keyExtractor={item => item.id}
                        />

                    </View>

                    <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', marginTop: 25, opacity: 0.4 }} />
                    <View style={{ justifyContent: "center", alignSelf: "center", padding: 16, flexDirection: "row" }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'black', fontSize: 16, alignSelf: "center" }}>Total</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'black', marginLeft: 30, fontSize: 20, alignSelf: "center" }}>$ {appointment?.proposal_id?.total + parseFloat(tip?.amount ?? 0)}</Text>

                    </View>
                    <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', opacity: 0.4 }} />
                    <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, alignSelf: "center", height: 44, width: '75%', marginTop: 20 }]} onPress={() => {
                        generatePaymentIntent(token, appointment._id, appointment?.proposal_id?.total + parseFloat(tip?.amount ?? 0)).then(response => {
                            if (response.ok) {
                                if (response.data?.status === true) {
                                    initializePaymentSheet(response.data.data.client_secret, response.data.data.emp_key)
                                }
                                else {
                                    Toast.show(response.data.message)
                                }
                            } else {
                                Toast.show(response.problem)
                            }
                        });
                    }} >
                        <Text style={styles.btnTitleStyle}>Complete Payment</Text>
                    </TouchableOpacity>
                    <CustomModal
                        isVisible={typevisible}
                        isTip={true}
                        onBackdropPress={() => setTypeVisible(false)}
                        text={'Add Tip'}
                        onChangeText={(t) => {
                            setTip({ 'amount': t, id: 'tip' })
                        }}
                        value={tip?.amount}
                        onPress={() => {
                            onAddTip()
                        }}
                    />
                    <BluePopUp
                        isVisible={popupVisible}
                        onBackdropPress={() => setPopupVisible(false)}
                        titleStr={titleStr}
                        msg={popUpMsg}
                    />

                    {loading && <Loader />}
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

export default CompletePaymentPage

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "45%",
        flexDirection: "row",
        height: 34,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 25,
        justifyContent: "center",
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 13,
        marginHorizontal: 8,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    pickerStyle: {
        flexDirection: "row",
        height: 34,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 25,
        alignItems: "center",
        marginLeft: 20,
        width: 104

    },
    pickerTitleStyle: {
        width: 90,
        height: 34,
        marginLeft: 4,
        color: "black",
        fontSize: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold,
        paddingVertical: 0,

    },
});
