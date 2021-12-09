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
import { getDetails, cancelAppointment, uploadImage } from "../apiSauce/HttpInteractor";
import Toast from 'react-native-simple-toast';
import CustomImagePickerModal from "../Helper/CustomImagePickerModal";

const MessageScreen = (props) => {
    let key = props.route.params.key + ""
    let chatHeader = props.route.params.chatHeader
    let toID = props.route.params.toID
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    const [msgs, setMsgs] = useState([])
    const [msg, setMsg] = useState('')
    const [showPicker, setPickerVisible] = useState(false)
    const [receiverData, setReceiverData] = useState()
    const listRef = useRef(null);
    const chatCollection = firestore().collection('Chats').doc(key).collection('messages');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const myCollection = firestore().collection('Users').doc(user._id).collection('Chats').doc(key);
    const otherCollection = firestore().collection('Users').doc(toID).collection('Chats').doc(key);

    useFocusEffect(
        React.useCallback(() => {
            if (user.user_type == 'Customer') {
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
        getDetails(user.user_type, id, providerId, token).then(response => {
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
        if (item._data.type === 'TIPTOP_REQUEST') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#00A8E0' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 12, marginHorizontal: 16, color: item._data.fromUid == user._id ? 'white' : Colors.blueText, fontSize: 12, fontFamily: Custom_Fonts.Montserrat_SemiBold, alignSelf: 'flex-end' }}>TIPTOP REQUEST</Text>
                            <Text style={{ marginTop: 8, marginHorizontal: 16, color: item._data.fromUid == user._id ? 'white' : 'black', fontSize: 16, fontFamily: Custom_Fonts.Montserrat_Bold }}>{item._data.details.date + ", " + item._data.details.startTime}</Text>
                            <Text style={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 4, color: item._data.fromUid == user._id ? 'white' : '#4D4D4D', fontSize: 14, fontFamily: Custom_Fonts.Montserrat_Regular }}>{item._data.msg}</Text>
                        </View>
                        <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 10, marginBottom: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text>
                    </View>
                </View>
            )
        }

        else if (item._data.type === 'REVIEW_TIPTOP') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#00A8E0' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: item._data.fromUid == user._id ? 'white' : Colors.blueText, fontSize: 12, fontFamily: Custom_Fonts.Montserrat_SemiBold }}>REVIEW TIPTOP</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : '#4D4D4D', fontSize: 14, fontFamily: Custom_Fonts.Montserrat_Medium }}>Your requested TipTop is ready for review and approval. Please review and accept this Tiptop within 24 hours, or your Tiptop will be cancelled.</Text>
                        </View>
                        <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 10, marginBottom: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text>
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'APPROVED') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#00A8E0' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16,alignSelf:'flex-end', marginHorizontal: 16, color: item._data.fromUid == user._id ? 'white' : Colors.blueText, fontSize: 12, fontFamily: Custom_Fonts.Montserrat_SemiBold }}>TIPTOP APPROVED</Text>
                            {user.user_type == 'Customer' ? null : <Text style={{ marginTop: 16, marginHorizontal: 16, color: '#4D4D4D', fontSize: 16, fontFamily: Custom_Fonts.Montserrat_Bold }}>Proposal Accepted</Text>
}
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : '#4D4D4D', fontSize: 14, fontFamily: Custom_Fonts.Montserrat_Medium }}>{user.user_type == 'Customer' ? 'You approved the Tiptop proposal!\nBe sure to let your TipTopper know if you have any questions, see you soon!':'Great news, '+chatHeader+' accepted your proposal.You can view the service in your upcoming Tiptops tab.' }</Text>
                        </View>
                        <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 10, marginBottom: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text>
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'RATE') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#00A8E0' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: Colors.blueText, fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Bold }}>TIPTOP APPROVED</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : '#4D4D4D', fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium }}>I hope you enjoyed your TipTop experience. Please rate your service so that I can provide a better one in the future! Thanks :)</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 16, alignSelf: "center" }}>
                                <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, width: '80%' }]} onPress={() => {
                                    //action
                                }} >
                                    <Text style={styles.btnTitleStyle}>Rate TipTop</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 10, marginBottom: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text>
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'REVIEW_DELETE') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#00A8E0' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16, marginHorizontal: 16, color: Colors.blueText, fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Bold }}>TIPTOP CANCELLED</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : '#4D4D4D', fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Medium }}>{item._data.fromUid == user._id ? 'Your Tiptop request is cancelled by User' : 'You cancelled the Tiptop request. You can make a new Tiptop request and enjoy your TipTop experience.'}</Text>

                        </View>
                        <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 10, marginBottom: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text>
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'REVIEW_REJECT') {
            return (
                <View style={{ flexdirection: 'row' }}>
                    <View style={{ width: '85%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start' }}>
                        <View style={{ borderRadius: 15, marginHorizontal: 16, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#00A8E0' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ marginTop: 16,alignSelf:'flex-end', marginHorizontal: 16, color: item._data.fromUid == user._id ? 'white' : Colors.blueText, fontSize: 12, fontFamily: Custom_Fonts.Montserrat_SemiBold }}>TIPTOP REJECTED</Text>
                            <Text style={{ padding: 16, color: item._data.fromUid == user._id ? 'white' : '#4D4D4D', fontSize: 14, fontFamily: Custom_Fonts.Montserrat_Medium }}>TipTop is rejected</Text>
                        </View>
                        <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 10, marginBottom: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text>
                    </View>
                </View>
            )
        }
        else if (item._data.type === 'IMAGE') {
            return (
                <View>
                    <View style={{ alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start', flexDirection: 'row' }}>
                        {user._id == item._data.fromUid ? null : <Image style={{ width: 24, height: 24, resizeMode: "cover", marginLeft: 8, borderRadius: 12 }} source={item._data.from == 'Admin' ? require('../assets/logoImg.png') : item._data.toProfileImg == '' ? require("../assets/dummy.png") : { uri: item._data.toProfileImg }} />}
                        <View style={{ borderRadius: 15, marginHorizontal: 8, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#00A8E0' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Image style={{ paddingVertical: 16, paddingHorizontal: 25, width: width * 0.6, height: width * 0.45, resizeMode: "cover", borderRadius: 8 }} source={{ uri: item._data.msg }} />
                        </View>
                    </View>
                    <Text style={{ marginHorizontal: 8, color: 'black', fontSize: 10, marginBottom: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{ maxWidth: '87%', alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start', }}>
                    <View style={{ alignSelf: user._id == item._data.fromUid ? 'flex-end' : 'flex-start', flexDirection: 'row' }}>
                        {user._id == item._data.fromUid ? null : <Image style={{ width: 24, height: 24, resizeMode: "cover", marginLeft: 8, borderRadius: 12 }} source={item._data.from == 'Admin' ? require('../assets/logoImg.png') : item._data.toProfileImg == '' ? require("../assets/dummy.png") : { uri: item._data.toProfileImg }} />}
                        <View style={{ borderRadius: 15, marginHorizontal: 12, marginVertical: 8, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, backgroundColor: item._data.fromUid == user._id ? '#00A8E0' : '#F1FBFF', shadowOffset: { width: 0, height: 1 } }}>
                            <Text style={{ paddingVertical: 16, paddingHorizontal: 25, color: item._data.fromUid == user._id ? 'white' : '#4D4D4D' }}>{item._data.msg}</Text>
                        </View>
                    </View>
                    <Text style={{ marginHorizontal: 12, color: 'black', fontSize: 10, marginBottom: 12, fontFamily: Custom_Fonts.Montserrat_Regular, alignSelf: item._data.fromUid == user._id ? 'flex-end' : 'flex-start' }}>{item._data.time}</Text>
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
                    <CustomImagePickerModal
                        visible={showPicker}
                        attachments={(data) => {
                            uploadImage(data.path, user.user_type == 'Customer').then(response => {
                                console.log(response.data)
                                if (response.ok) {
                                    if (response.data?.status === true) {
                                        console.log(response.data?.data.filename)
                                        chatCollection.add({
                                            toUid: toID,
                                            to: chatHeader,
                                            fromUid: user._id,
                                            from: user.name,
                                            type: 'IMAGE',
                                            key: key,
                                            time: moment().format("h:mm a"),
                                            timestamp: moment().unix(),
                                            msg: Constants.IMG_BASE_URL + response.data?.data.filename,
                                            details: {}
                                        })
                                            .then((docRef) => {
                                                setMsg('')
                                                chatCollection.doc(docRef.id).update({
                                                    msgId: docRef.id,
                                                    timestamp: moment().unix()
                                                })
                                                otherCollection.set({
                                                    toUid: user._id,
                                                    to: user.name,
                                                    toProfileImg: user.profile_pic.includes('https://') ? user.profile_pic : Constants.IMG_BASE_URL + user.profile_pic,
                                                    type: 'IMAGE',
                                                    date: moment().format("MM/DD/yyyy"),
                                                    key: key,
                                                    lastMsg: 'IMAGE',
                                                })
                                                myCollection.set({
                                                    toUid: toID,
                                                    to: chatHeader,
                                                    toProfileImg: receiverData.profile_pic.includes('https://') ? receiverData.profile_pic : Constants.IMG_BASE_URL + receiverData?.profile_pic,
                                                    type: 'IMAGE',
                                                    date: moment().format("MM/DD/yyyy"),
                                                    key: key,
                                                    lastMsg: 'IMAGE',
                                                })

                                            })
                                            .catch((error) => {
                                                setMsg('')
                                                console.error("Error writing document: ", error);
                                            });
                                        Toast.show(response.data.message)
                                    } else {
                                        Toast.show(response.data.message)
                                    }
                                } else {
                                    Toast.show(response.problem)
                                }
                            });
                        }}
                        pressHandler={() => {
                            setPickerVisible(false)
                        }}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack();
                        }} >
                            <Image style={{ width: 16, height: 16, resizeMode: "contain", marginHorizontal: 12 }} source={require("../assets/backBtn.png")} /></TouchableOpacity>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 22 }}>{chatHeader}</Text>
                        {/* <Image style={{ width: 24, height: 24, resizeMode: "contain", position: "absolute", end: 16 }} source={require("../assets/report.png")} /> */}
                    </View>

                    <FlatList
                        style={{ marginTop: 20, height: '78%' }}
                        horizontal={false}
                        data={msgs}
                        ref={listRef}
                        renderItem={Item}
                        onContentSizeChange={() => listRef.current.scrollToEnd()}
                        onLayout={() => listRef.current.scrollToEnd()}
                        keyExtractor={item => item._data.timestamp}
                    />
                    <View style={{ width: '100%', flexDirection: "row", marginBottom: 8 }}>
                        <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
                            setPickerVisible(true)
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
                                    toProfileImg: user.profile_pic.includes('https://') ? user.profile_pic : Constants.IMG_BASE_URL + user.profile_pic,
                                    type: 'TEXT',
                                    key: key,
                                    time: moment().format("h:mm a"),
                                    timestamp: moment().unix(),
                                    msg: msg,
                                    details: {}
                                })
                                    .then((docRef) => {
                                        setMsg('')
                                        chatCollection.doc(docRef.id).update({
                                            msgId: docRef.id,
                                            timestamp: moment().unix()
                                        })
                                        otherCollection.set({
                                            toUid: user._id,
                                            to: user.name,
                                            toProfileImg: user.profile_pic.includes('https://') ? user.profile_pic : Constants.IMG_BASE_URL + user.profile_pic,
                                            type: 'TEXT',
                                            date: moment().format("MM/DD/yyyy"),
                                            key: key,
                                            lastMsg: msg,
                                        })
                                        myCollection.set({
                                            toUid: toID,
                                            to: chatHeader,
                                            toProfileImg: receiverData.profile_pic.includes('https://') ? receiverData.profile_pic : Constants.IMG_BASE_URL + receiverData?.profile_pic,
                                            type: 'TEXT',
                                            date: moment().format("MM/DD/yyyy"),
                                            key: key,
                                            lastMsg: msg,
                                        })

                                    })
                                    .catch((error) => {
                                        setMsg('')
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