import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, TextInput, Image, FlatList, ScrollView } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "../screens/TopHeader/TopHeaderView";
import { useSelector } from "react-redux";
import Toast from 'react-native-simple-toast';
import Loader from '../Components/loader';
import _ from 'lodash'
import { getAppointmentDetail, getSavedCards, respondProposal } from "../apiSauce/HttpInteractor";
import moment from 'moment'
import firestore from '@react-native-firebase/firestore';
import { Constants } from "../Constants/Constants";
import BluePopUp from "../Components/BluePopUp";


const ViewUpdo = (props) => {
    const [loading, setLoading] = useState(false)
    const appointmentID = props.route.params.appointmentID
    const msgID = props.route.params.msgID
    const [appointmentData, setAppointmentData] = useState();
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    const [key, setKey] = useState('');
    const [providerID, setProviderID] = useState('');
    const [cards, setCards] = useState([]);
    const [last4, setLast4] = useState('XXXX');
    const defaultCardID = useSelector(state => state.userReducer.defaultCardID)
    const [popupVisible, setPopupVisible] = useState(false)
    const [titleStr, setTitleStr] = useState(false)
    const [msg, setMsg] = useState(false)


    useEffect(() => {
        setLoading(true);
        getAppointmentDetail(appointmentID).then(response => {
            if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                    setAppointmentData(response.data?.data)
                    if (user.userType == 'Customer') {
                        getCards()
                    }

                    setProviderID(response.data?.data.provider_id._id)
                    setKey(user._id + "_" + response.data?.data.provider_id._id)
                }
                else {
                    setLoading(false);
                    props.navigation.goBack()
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                props.navigation.goBack()
                Toast.show(response.problem)
            }
        });

    }, [])

    const getCards = () => {
        setLoading(true);
        getSavedCards(token).then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    setLoading(false);
                    setCards(response.data.data.data)
                    let card = response.data?.data.data.filter((data) => data._id === defaultCardID)
                    if (card.length > 0) {
                        setLast4(card[0].last4)
                    }
                    else {
                        setLast4(response.data?.data.data[0].last4)
                    }
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

    const respond = (id, action) => {
        setLoading(true);
        console.log(id, action);
        respondProposal(token, id, action).then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    setLoading(false);
                    if (action === "0") {
                        console.log(key)
                        firestore().collection('Chats').doc(key).collection('messages').doc(msgID).update({
                            type: "REVIEW_REJECT",
                            from: user.name,
                            fromUid: user._id
                        }).then(() => {
                            Toast.show(response.data.message)
                            props.navigation.goBack()
                        })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    }
                    else {
                        console.log(key)

                        firestore().collection('Chats').doc(key).collection('messages').doc(msgID).update({
                            type: "APPROVED",
                            from: user.name,
                            fromUid: user._id
                        }).then(() => {
                            Toast.show(response.data.message)
                            props.navigation.goBack()
                        })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    }
                }
                else {
                    setLoading(false);
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                Toast.show(response.problem)
            }
        });
    }

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
                          setMsg('The service tax depends on the US state where you’re located.')
                          setPopupVisible(true)
                      }
                      else{
                        setTitleStr('Service Fee')
                        setMsg('The team at Updo is completely transparent in how the business makes money. One part of this process is through a small fee. ')
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
                    <TopHeaderView title={'Updo with ' + appointmentData?.provider_id.name} />
                    <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
                        <Image style={{ width: 64, height: 64, resizeMode: "cover", borderRadius: 32 }} source={appointmentData?.provider_id.profile_pic == '' ? require("../assets/dummy.png") : { uri: Constants.IMG_BASE_URL + appointmentData?.provider_id.profile_pic }}></Image>
                        <View>
                            <Text style={[styles.btnTitleStyle, { color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>{moment.unix(appointmentData?.appoint_start).format('dddd, MMMM DD') + " at " + moment.unix(appointmentData?.appoint_start).format('h:mm a')}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: "contain", marginLeft: 8 }} source={require("../assets/navPin.png")} />
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 15, marginHorizontal: 4 }}>{appointmentData?.provider_id.address.city}, {appointmentData?.provider_id.address.state}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        margin: 16, backgroundColor: 'white', borderRadius: 8, elevation: 4, shadowColor: "grey",
                        shadowOpacity: 0.4,
                        flexDirection: "row", alignItems: "center",
                        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey", height: 40
                    }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "#8E8E8E", fontSize: 13, marginHorizontal: 4, width: '50%', textAlign: 'center' }}>Updo ID : {appointmentData?.proposal_id._id.slice(0, 6).toUpperCase()}</Text>
                        <View style={{ height: 40, width: 1, backgroundColor: '#8E8E8E', opacity: 0.4 }} />
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "#8E8E8E", fontSize: 13, marginHorizontal: 4, width: '50%', textAlign: 'center' }}>For Review</Text>
                    </View>

                    <FlatList
                        style={{ margin: 8 }}
                        horizontal={false}
                        data={appointmentData?.proposal_id.services_data}
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
                            data={appointmentData?.proposal_id.additional_charges}
                            renderItem={AdditionalItem}
                            keyExtractor={item => item.id}
                        />

                    </View>

                    <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', marginTop: 25, opacity: 0.4 }} />
                    <View style={{ justifyContent: "center", alignSelf: "center", padding: 16, flexDirection: "row" }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'black', fontSize: 16, alignSelf: "center" }}>Total</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'black', marginLeft: 30, fontSize: 20, alignSelf: "center" }}>$ {appointmentData?.proposal_id?.total}</Text>

                    </View>
                    <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', opacity: 0.4 }} />
                    {user.userType == 'Customer' ? <View>
                        {cards.length > 0 ? <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: '#4D4D4D', fontSize: 11, margin: 12, textAlign: "center" }}>Your card ending in {last4} will be charged at the time of service.</Text>
                            : <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, alignSelf: "center", height: 44, width: '60%', marginTop: 20 }]} onPress={() => {
                                props.navigation.navigate('PaymentsScreen')
                            }} >
                                <Text style={styles.btnTitleStyle}>Add Payment Method</Text>
                            </TouchableOpacity>}
                    </View> : null}
                    {user.userType == 'Customer' ? <View style={{ width: '90%', alignSelf: 'center', borderColor: Colors.themeBlue, borderRadius: 12, backgroundColor: '#F1FBFF', borderWidth: 1, marginVertical: 20, padding: 16 }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'black', fontSize: 16 }}>Review This Updo</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: 'black', fontSize: 13, marginVertical: 12 }}>If you have any issues or changes, please let {appointmentData?.provider_id.name} know. If everything looks good, accept this Updo and your booking will be confirmed.</Text>
                        <View style={{ flexDirection: 'row', alignSelf: "center" }}>
                            <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText }]} onPress={() => {
                                respond(appointmentData?.proposal_id._id, "1");
                            }} >
                                <Text style={styles.btnTitleStyle}>Approve</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btnViewStyle, { borderColor: Colors.themeBlue, borderWidth: 1.5 }]} onPress={() => {
                                respond(appointmentData?.proposal_id._id, "0");

                            }} >
                                <Text style={[styles.btnTitleStyle, { color: Colors.themeBlue }]}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        : null}


                    <BluePopUp
                        isVisible={popupVisible}
                        onBackdropPress={() => setPopupVisible(false)}
                        titleStr = {titleStr}
                        msg = {msg}
                    />

                    {loading && <Loader />}


                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

export default ViewUpdo

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
