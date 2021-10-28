import React, { useState } from "react";
import { Text, SafeAreaView, View, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Constants } from "../Constants/Constants";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { Calendar } from 'react-native-calendars';
import { getTimeSlots, freezeSlot } from "../apiSauce/HttpInteractor";
import { useSelector } from "react-redux"
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import moment from 'moment'
import firestore from '@react-native-firebase/firestore';
import Loader from '../Components/loader';

const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + '-' + month + '-' + date;//format: yyyy-mm-dd;
}

const SchduleScreen = (props) => {
    let providerID = props.route.params.providerID
    let providerName = props.route.params.providerName
    let providerImg = props.route.params.providerImg
    const [slots, setSlots] = useState([]);
    const [currentDate, setCurrentDate] = useState(getCurrentDate)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isAccepted, setIsAccepted] = useState(false)
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.userReducer.token)
    const user = useSelector(state => state.userReducer.user)
    const usersCollection = firestore().collection('Users').doc(user._id).collection('Chats').doc(user._id + "_" + providerID);
    const providerCollection = firestore().collection('Users').doc(providerID).collection('Chats').doc(user._id + "_" + providerID);
    const chatCollection = firestore().collection('Chats').doc(user._id + "_" + providerID).collection('messages');

    const Item = ({ item, index }) => (
        <TouchableOpacity onPress={() => {
            setSelectedIndex(index)
        }} style={[styles.item, { backgroundColor: selectedIndex == index ? Colors.themeBlue : "#ECECEC" }]}>
            <Text style={[styles.title, { color: selectedIndex == index ? 'white' : 'black' }]}>{item.human_start_time}</Text>
        </TouchableOpacity>
    );

    const getTimeSlot = (str) => {
        setLoading(true);
        getTimeSlots(providerID, moment(str).format('MM/DD/yyyy'), token).then(response => {
            console.log("dfdgfd>>>>>>>>>>>>>>>>>>>>>", response.data)
            if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                    setSlots(response.data.data.filter((data) => data.is_booked == 0))
                }
                else {
                    setSlots([])
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                setSlots([])
                Toast.show(response.problem)
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            getTimeSlot(currentDate)
            return () => {
                //unfocused
            };
        }, [])
    );


    return (
        <View style={{ backgroundColor: 'white' }}>
            <ScrollView
                key="scroll"
                style={{ width: "100%", height: "100%" }}
                horizontal={false}
                scrollEventThrottle={16}
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                <SafeAreaView>
                    <TopHeaderView title="Schedule with Juliana" />
                    <Calendar
                        current={new Date().now}
                        markedDates={{
                            [currentDate]: { selected: true, selectedColor: '#F0B752' }
                        }}
                        style={{ borderRadius: 1 }}
                        theme={{
                            textDayFontFamily: Custom_Fonts.Montserrat_Regular,
                            textMonthFontFamily: Custom_Fonts.Montserrat_Regular,
                            textDayHeaderFontFamily: Custom_Fonts.Montserrat_Medium,
                            selectedDayBackgroundColor: '#F0B752',
                            textDayFontSize: 12,
                            arrowColor: Colors.themeBlue,
                            textSectionTitleColor: Colors.themeBlue,
                            todayTextColor: Colors.themeBlue,
                            dayTextColor: 'black',
                            textDisabledColor: 'grey',
                            monthTextColor: 'black',
                            textMonthFontFamily: Custom_Fonts.Montserrat_Regular,
                            textDayFontSize: 12,
                            textMonthFontSize: 14,
                            textDayHeaderFontSize: 12,
                        }}
                        onDayPress={text => {
                            setCurrentDate(text.dateString)
                            getTimeSlot(text.dateString)
                        }}
                    />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, margin: 16 }}>Available Times</Text>
                    <FlatList
                        key="event"
                        style={{ marginLeft: 8, marginTop: 8 }}
                        horizontal={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={slots}
                        renderItem={Item}
                        keyExtractor={item => item.id}
                    />

                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }} onPress={() => setIsAccepted(!isAccepted)}>
                        <Image style={{ resizeMode: "stretch", width: 24, height: 24, marginLeft: 16 }} source={isAccepted ? require("../assets/checked.png") : require("../assets/checkBox.png")}></Image>
                        <Text style={{ fontSize: 14, fontFamily: Custom_Fonts.Montserrat_Regular, color: "#4D4D4D", marginLeft: 12 }} >I accept all terms & conditions</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: "94%",
                        flexDirection: "row",
                        height: 48,
                        alignSelf: "center",
                        backgroundColor: Colors.themeBlue,
                        marginTop: 40,
                        marginBottom: 60,
                        borderRadius: 25,
                        justifyContent: "center"
                    }} onPress={() => {
                        if (isAccepted == true) {
                            if (selectedIndex != 50 && selectedIndex != null) {
                                let startTime = slots[selectedIndex].start_time
                                let endTime = slots[selectedIndex].end_time
                                setLoading(true);
                                freezeSlot(token, providerID, startTime, endTime).then(response => {
                                    if (response.ok) {
                                        console.log(response.data)
                                        if (response.data?.status === true) {
                                            providerCollection.set({
                                                toUid: user._id,
                                                to: user.name,
                                                toProfileImg: Constants.IMG_BASE_URL + user.profile_pic,
                                                type: 'UPDO_REQUEST',
                                                date: moment().format("MM/DD/yyyy"),
                                                key: user._id + '_' + providerID,
                                                lastMsg: 'UPDO REQUEST',
                                            })
                                            usersCollection.set({
                                                toUid: providerID,
                                                to: providerName,
                                                toProfileImg: Constants.IMG_BASE_URL + providerImg,
                                                type: 'UPDO_REQUEST',
                                                date: moment().format("MM/DD/yyyy"),
                                                key: user._id + '_' + providerID,
                                                lastMsg: 'UPDO REQUEST',
                                            })
                                                .then(() => {
                                                    chatCollection.add({
                                                        toUid: providerID,
                                                        to: providerName,
                                                        fromUid: user._id,
                                                        from: user.name,
                                                        type: 'UPDO_REQUEST',
                                                        key: user._id + '_' + providerID,
                                                        time: moment().format("HH:mm"),
                                                        timestamp: moment().unix(),
                                                        msg: 'Hi ' + providerName + ' I am looking for a service',
                                                        details: { startTime: slots[selectedIndex].human_start_time, date: moment(currentDate).format('MMMM DD'), appointmentID: response.data.data }
                                                    })
                                                        .then((docRef) => {
                                                            setLoading(false);

                                                            chatCollection.doc(docRef.id).update({
                                                                msgId: docRef.id,
                                                                timestamp: moment().unix()
                                                            })
                                                            props.navigation.navigate('MessageScreen', { key: user._id + '_' + providerID, chatHeader: providerName, toID: providerID })
                                                        })
                                                        .catch((error) => {
                                                            setLoading(false);

                                                            console.error("Error writing document: ", error);
                                                        });
                                                })
                                                .catch((error) => {
                                                    setLoading(false);

                                                    console.error("Error writing document: ", error);
                                                });
                                            Toast.show(response.data.message)
                                        }
                                        else {
                                            setLoading(false);

                                            Toast.show(response.data.message)
                                        }
                                    } else {
                                        setLoading(false);

                                        Toast.show(response.problem)
                                    }
                                }).catch((error) => {
                                    setLoading(false);
                                    Toast.show(error.message)
                                });
                            }
                            else {

                                Toast.show('Please choose a slot first')
                            }
                        }
                        else {
                            Toast.show('Please accept terms & conditions first')
                        }
                    }} >
                        <Text style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 17,
                            fontFamily: Custom_Fonts.Montserrat_SemiBold
                        }}>Request Updo</Text>
                    </TouchableOpacity>

                </SafeAreaView>
                {loading && <Loader />}

            </ScrollView>
        </View>

    );
}

export default SchduleScreen



const styles = StyleSheet.create({
    item: {
        padding: 8,
        margin: 8,
        height: 40,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 14,
        marginLeft: 12,
        color: "black",
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },


});
