import React, { useState, useEffect, useRef } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, FlatList, Image, Dimensions, TextInput, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const { width, height } = Dimensions.get('window');
import { useSelector } from "react-redux"
import firestore from '@react-native-firebase/firestore';
import { Constants } from "../Constants/Constants";
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native';
import { getDetails,cancelAppointment } from "../apiSauce/HttpInteractor";
import Toast from 'react-native-simple-toast';

const MessageScreen = (props) => {
    let key = props.route.params.key + ""
    let chatHeader = props.route.params.chatHeader
    let toID = props.route.params.toID
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    const [msgs, setMsgs] = useState([])
    const [msg, setMsg] = useState('')
    const [receiverData, setReceiverData] = useState()
    const listRef = useRef(null);
    const chatCollection = firestore().collection('Chats').doc(key).collection('messages');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const myCollection = firestore().collection('Users').doc(user._id).collection('Chats').doc(key);
    const otherCollection = firestore().collection('Users').doc(toID).collection('Chats').doc(key);

    useFocusEffect(
        React.useCallback(() => {
            if (user.userType == 'Customer') {
                getProviderData(user._id, toID)
            }
            else {
                getProviderData(toID, user._id)
            }
            return () => {
                //unfocused
            };
        }, [])
    );

    const getProviderData = (id, providerId) => {
        getDetails(user.userType, id, providerId, token).then(response => {
            console.log("dfdgfd>>>>>>>>>>>>>>>>>>>>>", response.data.data)
            if (response.ok) {
                if (response.data?.status === true) {
                    setReceiverData(response.data.data)
                }
                else {
                    Toast.show(response.data.message)
                }
            } else {

                Toast.show(response.problem)
            }
        });
    }



    const Item = ({ item, index }) => {
        if (item._data.type === 'UPDO_REQUEST') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#18A7C7' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: Colors.blueText, fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Bold }}>UPDO REQUEST</Text>
                            <Text style={{ marginTop: 8, marginHorizontal: 16, color: item._data.fromUid == user._id ? 'white' : Colors.blueText, fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Bold }}>{item._data.details.date + ", " + item._data.details.startTime}</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : 'black', fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Regular }}>{item._data.msg}</Text>
                        </View>
                        {index == msgs.length - 1 ?
                            <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text> : null}
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'REVIEW_UPDO') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#18A7C7' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: Colors.blueText, fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Bold }}>REVIEW UPDO</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : 'black', fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium }}>Your requested Updo is ready for review and approval. Please review and accept this Updo within 24 hours, or your Updo will be cancelled.</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 16, alignSelf: "center" }}>
                                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText }]} onPress={() => {
                                    props.navigation.navigate('ViewUpdo',{appointmentID:item._data.details.appointmentID,msgID:item._data.msgId})
                                }} >
                                    <Text style={styles.btnTitleStyle}>View Updo</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.btnViewStyle, { borderColor: Colors.themeBlue, borderWidth: 1.5 }]} onPress={() => {
                                   //appointmentID
                                   cancelAppointment(token,item._data.
                                    details.appointmentID).then(response => {
                                        if (response.ok) {
                                            if (response.data?.status === true) {
                                                chatCollection.doc(item._data.msgId).update({
                                                    type: 'REVIEW_DELETE',
                                                 })
                                                Toast.show(response.data.message)
                                            }
                                            else {
                                                Toast.show(response.data.message)
                                            }
                                        } else {
                            
                                            Toast.show(response.problem)
                                        }
                                    });
                                }} >
                                    <Text style={[styles.btnTitleStyle, { color: Colors.themeBlue }]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {index == msgs.length - 1 ?
                            <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text> : null}
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'APPROVED') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#18A7C7' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: Colors.blueText, fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Bold }}>UPDO APPROVED</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : 'black', fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium }}>{item._data.fromUid == user._id ? 'You approved updo request. Updoer is looking forward for your service!' : 'Hi, I just approved your proposal. Looking forward for your service!'}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 16, alignSelf: "center" }}>
                                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: "#F0B752", width: '80%' }]} onPress={() => {
                                    //action
                                }} >
                                    <Text style={styles.btnTitleStyle}>View My Updo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {index == msgs.length - 1 ?
                            <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text> : null}
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'RATE') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#18A7C7' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: Colors.blueText, fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Bold }}>UPDO APPROVED</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : 'black', fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium }}>I hope you enjoyed your Updo experience. Please rate your service so that I can provide a better one in the future! Thanks :)</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 16, alignSelf: "center" }}>
                                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, width: '80%' }]} onPress={() => {
                                    //action
                                }} >
                                    <Text style={styles.btnTitleStyle}>Rate Updo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {index == msgs.length - 1 ?
                            <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text> : null}
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'REVIEW_DELETE') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#18A7C7' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: Colors.blueText, fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Bold }}>UPDO CANCELLED</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : 'black', fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium }}>{item._data.fromUid == user._id ? 'Your updo request is cancelled by User' :'You cancelled the Updo request. You can make a new Updo request and enjoy your Updo experience.'}</Text>
                           
                        </View>
                        {index == msgs.length - 1 ?
                            <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text> : null}
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'REVIEW_REJECT') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#18A7C7' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: Colors.blueText, fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Bold }}>UPDO REJECTED</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : 'black', fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium }}>{item._data.fromUid == user._id ? 'Your updo request is rejected by User' :'You rejected the Updo request.'}</Text>
                           
                        </View>
                        {index == msgs.length - 1 ?
                            <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text> : null}
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                    <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#18A7C7' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                        <Text style={{ paddingVertical: 16, paddingHorizontal: 25, color: item._data.fromUid == user._id ? 'white' : 'black' }}>{item._data.msg}</Text>
                    </View>
                    {index == msgs.length - 1 ?
                        <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text> : null}
                </View>
            )
        }
    };

    useEffect(() => {
        chatCollection.onSnapshot((snapshot) => {
            let msgs = snapshot._docs.sort((a, b) => a._data.timestamp > b._data.timestamp ? 1 : -1)
            setMsgs(msgs)
        }, (error) => {
            console.log(error)
        });
    }, []);

    return (

        <View style={{ height, backgroundColor: 'white' }}>
            <SafeAreaView>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('InboxTabScreen')
                        }} >
                            <Image style={{ width: 16, height: 16, resizeMode: "contain", marginHorizontal: 12 }} source={require("../assets/backBtn.png")} /></TouchableOpacity>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 22 }}>{chatHeader}</Text>
                        <Image style={{ width: 24, height: 24, resizeMode: "contain", position: "absolute", end: 16 }} source={require("../assets/report.png")} />
                    </View>

                    <FlatList
                        style={{ marginTop: 20, height: '78%' }}
                        horizontal={false}
                        data={msgs}
                        ref={listRef}
                        renderItem={Item}
                        onContentSizeChange={() => listRef.current.scrollToEnd()}
                        onLayout={() => listRef.current.scrollToEnd()}
                        keyExtractor={item => item._data.fromUid}
                    />
                    <View style={{ width: '100%', flexDirection: "row", marginBottom: 20 }}>
                        <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {

                        }} >
                            <Image style={{ width: 70, height: 60, resizeMode: "contain" }} source={require("../assets/photo.png")} />
                        </TouchableOpacity>

                        <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 22, width: '75%', height: 44, marginVertical: 5, flexDirection: "row", paddingHorizontal: 8 }}>
                            <TextInput style={{ width: '87%' }} placeholder='Type a message...' value={msg} onChangeText={(t) => {
                                setMsg(t)
                            }} />
                            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
                                msg == '' ? null : chatCollection.add({
                                    toUid: toID,
                                    to: chatHeader,
                                    fromUid: user._id,
                                    from: user.name,
                                    type: 'TEXT',
                                    key: key,
                                    time: moment().format("HH:mm"),
                                    timestamp: moment().unix(),
                                    msg: msg,
                                    details: {}
                                })
                                    .then((docRef) => {
                                        chatCollection.doc(docRef.id).update({
                                           msgId:docRef.id,
                                           timestamp: moment().unix()
                                        })
                                        otherCollection.set({
                                            toUid: user._id,
                                            to: user.name,
                                            toProfileImg: Constants.IMG_BASE_URL + user.profile_pic,
                                            type: 'TEXT',
                                            date: moment().format("MM/DD/yyyy"),
                                            key: key,
                                            lastMsg: msg,
                                        })
                                        myCollection.set({
                                            toUid: toID,
                                            to: chatHeader,
                                            toProfileImg: Constants.IMG_BASE_URL + receiverData.profile_pic,
                                            type: 'TEXT',
                                            date: moment().format("MM/DD/yyyy"),
                                            key: key,
                                            lastMsg: msg,
                                        })
                                        setMsg('')
                                    })
                                    .catch((error) => {
                                        console.error("Error writing document: ", error);
                                    });
                            }} >
                                <Image style={{ width: 28, height: 28, resizeMode: "contain" }} source={require("../assets/sendBtn.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>

        </View>


    )
}
export default MessageScreen


const styles = StyleSheet.create({
    btnViewStyle: {
        width: "40%",
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
    }
});