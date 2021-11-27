import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, TextInput, Image, FlatList, ScrollView } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import TopHeaderView from "../TopHeader/TopHeaderView";
import { useSelector } from "react-redux";
import Toast from 'react-native-simple-toast';
import Loader from '../../Components/loader';
import _ from 'lodash'
import { sendPropsal, updatePropsal } from "../../apiSauce/HttpInteractor";
import moment from 'moment'
import firestore from '@react-native-firebase/firestore';
import { Constants } from "../../Constants/Constants";


const UpdoBuildStep2 = (props) => {
    const [loading, setLoading] = useState(false)
    let appointmentData = useSelector(state => state.userReducer).appointmentData
    const [serviceData, setServiceData] = useState(appointmentData.services_data);
    const [totalServicePrice, setTotalServicePrice] = useState(0);
    const [additionalCost, setAdditionalCost] = useState(0);
    const [note, setNote] = useState(appointmentData?.note ?? "");
    const [DATA, setDATA] = useState(appointmentData?.additionalCharges?.length > 0 ? appointmentData?.additionalCharges : [{
        charge_name: 'Service Tax',
        charge_amount: '0'
    }, {
        charge_name: 'Service Fee',
        charge_amount: '0'
    }]);
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)

    const customerCollection = firestore().collection('Users').doc(appointmentData.customer_id).collection('Chats').doc(appointmentData.customer_id + "_" + user._id);
    const chatCollection = firestore().collection('Chats').doc(appointmentData.customer_id + "_" + user._id).collection('messages');
    const myCollection = firestore().collection('Users').doc(user._id).collection('Chats').doc(appointmentData.customer_id + "_" + user._id);

    useEffect(() => {
        let total = serviceData
        let alltotal = 0
        for (let index = 0; index < total.length; index++) {
            const element = total[index];
            let subtotal = 0
            for (let index = 0; index < element.sub_services.length; index++) {
                const service_total = element.sub_services[index].service_total;
                subtotal += service_total
            }
            alltotal += subtotal
            subtotal = 0
        }
        setTotalServicePrice(alltotal)
    }, [serviceData])

    useEffect(() => {
        let total = DATA.map(x => Number(x.charge_amount)).reduce((sum, x) => sum + x)
        setAdditionalCost(total)
    }, [DATA])

    const Item = (item, index) => (
        <View >
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }}>
                <Image style={{ width: 24, height: 24, marginHorizontal: 12, marginTop: 12, alignSelf: 'flex-end', resizeMode: 'contain' }} source={require('../../assets/editIcon.png')} />
            </TouchableOpacity>
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
            <View>
                <View
                    style={{
                        flexDirection: "row", paddingHorizontal: 16, alignItems: 'center',marginTop:index == 0? -8 : 16,marginBottom:20
                    }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, width: '50%' }}>{item.service_name}</Text>
                </View>
                <View style={{ flexDirection: "row",marginVertical:16,justifyContent: "space-between",marginHorizontal:16}}>
                <View style={{ width: 90, height: 32, borderRadius: 16, flexDirection: "row"}}>
                    <TouchableOpacity style={{ width: 30, height: 32, alignItems: "center", backgroundColor: Colors.themeBlue, borderTopLeftRadius: 16, borderBottomLeftRadius: 16, justifyContent: "center" }} onPress={() => {
                        let dataC = _.cloneDeep(serviceData)
                        if (item.service_qty > 1) {
                            dataC[parentindex].sub_services[index].service_qty = item.service_qty - 1
                            dataC[parentindex].sub_services[index].service_total = item.service_price * (item.service_qty - 1)
                            setServiceData(dataC)
                        }
                    }} >
                        <Text style={{ color: 'white', fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, textAlign: "center" }}>-</Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', width: 30, borderWidth: 1, borderColor: Colors.themeBlue, height: 32 }}>
                        <Text style={{ color: 'black', fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, textAlign: 'center', }}>{item.service_qty}</Text>
                    </View>
                    <TouchableOpacity style={{ width: 30, height: 32, alignItems: "center", backgroundColor: Colors.themeBlue, borderTopRightRadius: 16, borderBottomRightRadius: 16, justifyContent: "center" }} onPress={() => {
                        let dataC = _.cloneDeep(serviceData)
                        if (item.service_qty < 50) {
                            dataC[parentindex].sub_services[index].service_qty = item.service_qty + 1
                            dataC[parentindex].sub_services[index].service_total = item.service_price * (item.service_qty + 1)
                            setServiceData(dataC)
                        }
                    }} >
                        <Text style={{ color: 'white', fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, textAlign: "center" }}>+</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={[styles.pickerStyle,{width:130,height:50,borderRadius:8}]}>
                        <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 20 }}>$</Text>
                        <TextInput
                            editable={false}
                            style={[styles.pickerTitleStyle,{fontSize: 20,marginTop:2,marginLeft:0}]}
                            value={String(item.service_total)}
                            placeholder="" keyboardType="number-pad" />
                    </View>

                </View>
            </View>
        );
    }

    const AdditionalItem = ({ item, index }) => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row", paddingHorizontal: 16, alignItems: 'center'
                    }}>
                    <TextInput style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, width: '50%', color: 'black' }}
                        value={item.charge_name}
                        onChangeText={t => {
                            let dataC = _.cloneDeep(DATA)
                            dataC[index].charge_name = t
                            setDATA(dataC)
                        }}
                    />
                    <View style={styles.pickerStyle}>
                        <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 12 }}>$</Text>
                        <TextInput
                            style={[styles.pickerTitleStyle, { color: 'black' }]}
                            value={item.charge_amount + ''}
                            onChangeText={t => {
                                let dataC = _.cloneDeep(DATA)
                                dataC[index].charge_amount = t
                                setDATA(dataC)
                            }}
                            placeholder="" keyboardType="number-pad" />

                    </View>
                    <TouchableOpacity onPress={() => {
                        let dataC = _.cloneDeep(DATA)
                        if (index == DATA.length-1){
                            dataC.push({ charge_name: "Additional Charge", charge_amount: "0" })
                        }
                        else{
                            dataC.splice(index, 1)
                        }
                        setDATA(dataC)
                    }} >
                        <Image style={{ width: 26, height: 26, resizeMode: "cover", marginLeft: 16,marginTop: -13 }} source={index == DATA.length-1 ? require("../../assets/addBtnBlue.png") : require("../../assets/minus.png")} />
                    </TouchableOpacity>
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
                    <TopHeaderView title={'TipTop with ' + appointmentData.customerName} />
                    <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
                        <Image style={{ width: 64, height: 64, resizeMode: "cover", borderRadius: 32 }} source={appointmentData.customerImg == '' ? require("../../assets/dummy.png") : { uri: Constants.IMG_BASE_URL + appointmentData.customerImg }}></Image>
                        <View>
                            <Text style={[styles.btnTitleStyle, { color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>{moment.unix(appointmentData.start_time).format('dddd, MMMM DD') + " at " + moment.unix(appointmentData.start_time).format('h:mm A')}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: "contain", marginLeft: 8 }} source={require("../../assets/navPin.png")} />
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 15, marginHorizontal: 4 }}>{appointmentData.customerLoc}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold, margin: 16, color: '#4D4D4D', fontSize: 13 }}>Quoted Services</Text>

                    <View style={{
                        margin: 8, backgroundColor: 'white', borderRadius: 16, elevation: 4, shadowColor: "grey",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
                    }}>
                        <FlatList
                            horizontal={false}
                            data={serviceData}
                            renderItem={(itemData) => Item(itemData.item, itemData.index)}
                            keyExtractor={item => item.id}
                        />

                    </View>

                    <View style={{
                        margin: 8, backgroundColor: 'white', borderRadius: 16, elevation: 4, shadowColor: "grey",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
                    }}>
                        <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, color: 'black', fontSize: 16, marginVertical: 20 }}>Add Additional Charges</Text>

                        <FlatList
                            horizontal={false}
                            data={DATA}
                            renderItem={AdditionalItem}
                            keyExtractor={item => item.id}
                        />
                        <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 20, color: 'black', fontSize: 17, marginVertical: 20, alignSelf: 'flex-end' }}>Total:   ${additionalCost}</Text>

                    </View>

                    <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 25, marginLeft: 16, color: '#4D4D4D', fontSize: 13 }}>Notes</Text>
                    <TextInput style={{ height: 90, borderRadius: 12, borderWidth: 1, borderColor: Colors.themeBlue, margin: 16, padding: 12, color: 'black' }} value={note} onChangeText={t => {
                        setNote(t)
                    }} multiline={true} placeholder='Any special instructions or notes about this TipTop. This will appear on your client’s statement.' />

                    <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', marginTop: 25, opacity: 0.4 }} />
                    <View style={{ justifyContent: "center", alignSelf: "center", padding: 16, flexDirection: "row" }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'black', fontSize: 16, alignSelf: "center" }}>Subtotal</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'black', marginLeft: 30, fontSize: 20, alignSelf: "center" }}>$ {additionalCost + totalServicePrice}</Text>

                    </View>
                    <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', opacity: 0.4 }} />

                    <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue, width: '90%', alignSelf: "center", marginTop: 40, height: 48, borderRadius: 24 }]} onPress={() => {
                        let additionCost = DATA
                        let a = serviceData.map(x => {
                            let sub_services = x.sub_services.map(y => ({
                                "service_name": y.service_name,
                                "service_price": y.service_price,
                                "service_qty": y.service_qty,
                                "service_total": y.service_total
                            }))
                            return ({ service_id: x.service_id, sub_services })
                        })

                        setLoading(true);

                        if ((appointmentData?.proposal_id ?? '') != '') {
                            updatePropsal(token, appointmentData.id, appointmentData.start_time, appointmentData.end_time, a, appointmentData.customer_id, additionCost, additionalCost + totalServicePrice, "", note, appointmentData.proposal_id).then(response => {
                                if (response.ok) {
                                    if (response.data?.status === true) {
                                        setLoading(false);
                                        customerCollection.set({
                                            toUid: user._id,
                                            to: user.name,
                                            toProfileImg: Constants.IMG_BASE_URL + user.profile_pic,
                                            type: 'TEXT',
                                            date: moment().format("MM/DD/yyyy"),
                                            key: appointmentData.customer_id + "_" + user._id,
                                            lastMsg: "Hey there!!\nPurposal has been updated.\nIt's ready for review and approval. Please review  and accept this TipTop within 24 hours, or your TipTop will be cancelled."
                                        })
                                        myCollection.set({
                                            toUid: appointmentData.customer_id,
                                            to: appointmentData.customerName,
                                            toProfileImg: Constants.IMG_BASE_URL + appointmentData.customerImg,
                                            type: 'TEXT',
                                            date: moment().format("MM/DD/yyyy"),
                                            key: appointmentData.customer_id + "_" + user._id,
                                            lastMsg: "Hey there!!\nPurposal has been updated.\nIt's ready for review and approval. Please review  and accept this TipTop within 24 hours, or your TipTop will be cancelled."
                                        })
                                        chatCollection.add({
                                            toUid: appointmentData.customer_id,
                                            to: appointmentData.customerName,
                                            toProfileImg: Constants.IMG_BASE_URL + user.profile_pic,
                                            fromUid: user._id,
                                            from: user.name,
                                            type: 'TEXT',
                                            key: appointmentData.customer_id + "_" + user._id,
                                            time: moment().format("HH:mm"),
                                            timestamp: moment().unix(),
                                            msg: "Hey there!!\nPurposal has been updated.\nIt's ready for review and approval. Please review  and accept this TipTop within 24 hours, or your TipTop will be cancelled.",
                                            details: { appointmentID: appointmentData.id }
                                        })
                                            .then((docRef) => {
                                                setLoading(false);
                                                chatCollection.doc(docRef.id).update({
                                                    msgId: docRef.id,
                                                    timestamp: moment().unix()
                                                })
                                                props.navigation.navigate('MessageScreen', { key: appointmentData.customer_id + "_" + user._id, chatHeader: appointmentData.customerName, toID: appointmentData.customer_id })
                                            })
                                            .catch((error) => {
                                                console.error("Error writing document: ", error);
                                            });
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
                        else {
                            sendPropsal(token, appointmentData.id, appointmentData.start_time, appointmentData.end_time, a, appointmentData.customer_id, additionCost, additionalCost + totalServicePrice, "", note).then(response => {
                                if (response.ok) {

                                    if (response.data?.status === true) {
                                        setLoading(false);
                                        customerCollection.set({
                                            toUid: user._id,
                                            to: user.name,
                                            toProfileImg: Constants.IMG_BASE_URL + user.profile_pic,
                                            type: 'REVIEW_TIPTOP',
                                            date: moment().format("MM/DD/yyyy"),
                                            key: appointmentData.customer_id + "_" + user._id,
                                            lastMsg: 'REVIEW_TIPTOP',
                                        })
                                        myCollection.set({
                                            toUid: appointmentData.customer_id,
                                            to: appointmentData.customerName,
                                            toProfileImg: Constants.IMG_BASE_URL + appointmentData.customerImg,
                                            type: 'REVIEW_TIPTOP',
                                            date: moment().format("MM/DD/yyyy"),
                                            key: appointmentData.customer_id + "_" + user._id,
                                            lastMsg: 'REVIEW_TIPTOP',
                                        })
                                        chatCollection.add({
                                            toUid: appointmentData.customer_id,
                                            to: appointmentData.customerName,
                                            toProfileImg: Constants.IMG_BASE_URL + user.profile_pic,
                                            fromUid: user._id,
                                            from: user.name,
                                            type: 'REVIEW_TIPTOP',
                                            key: appointmentData.customer_id + "_" + user._id,
                                            time: moment().format("HH:mm"),
                                            timestamp: moment().unix(),
                                            msg: 'Your requested TipTop is ready for review and approval. Please review  and accept this TipTop within 24 hours, or your TipTop will be cancelled.',
                                            details: { appointmentID: appointmentData.id }
                                        })
                                            .then((docRef) => {
                                                setLoading(false);
                                                chatCollection.doc(docRef.id).update({
                                                    msgId: docRef.id,
                                                    timestamp: moment().unix()
                                                })
                                                props.navigation.navigate('MessageScreen', { key: appointmentData.customer_id + "_" + user._id, chatHeader: appointmentData.customerName, toID: appointmentData.customer_id })
                                            })
                                            .catch((error) => {
                                                console.error("Error writing document: ", error);
                                            });
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

                    }} >
                        <Text style={[styles.btnTitleStyle, { fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'white', fontSize: 14 }]}>{(appointmentData?.proposal_id ?? '') != '' ? 'Update Proposal' : 'Send Proposal'}</Text>
                    </TouchableOpacity>
                    {loading && <Loader />}


                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

export default UpdoBuildStep2

const styles = StyleSheet.create({
    btnViewStyle: {
        height: 40,
        marginVertical: 12,
        marginHorizontal: 4,
        borderRadius: 20,
        justifyContent: "center", elevation: 3, flexDirection: "row"
    }
    ,
    btnTitleStyle: {
        alignSelf: "center",
        marginHorizontal: 12,
        fontSize: 14
    },
    pickerStyle: {
        flexDirection: "row",
        height: 34,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 17,
        alignItems: "center",
        marginLeft: 20,
        width: 104,marginTop:-15

    },
    pickerTitleStyle: {
        width: 90,
        height: 34,
        marginLeft: 4,
        color: "black",
        fontSize: 14,
        marginTop:2,
        fontFamily: Custom_Fonts.Montserrat_SemiBold,
        paddingVertical: 0,

    },
});
