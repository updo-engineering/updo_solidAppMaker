import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUpdos } from "../../apiSauce/HttpInteractor";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { Constants } from "../../Constants/Constants";
import Loader from '../../Components/loader';
import { setAppointmentData } from "../../Redux/userDetail";
import firestore from '@react-native-firebase/firestore';
const UpdosTabScreen = ({ navigation }) => {
    const auth = useSelector(state => state.userReducer.auth)
    const token = useSelector(state => state.userReducer.token)
    const user = useSelector(state => state.userReducer.user)
    let appointmentData = useSelector(state => state.userReducer).appointmentData
    const eventCollection = firestore().collection('events').doc(user?._id);
    let D = [{
        id: 1,
        title: 'Upcoming'
    },
    {
        id: 0,
        title: 'In Review'
    },
    {
        id: 3,
        title: 'Past'
    },
    {
        id: 2,
        title: 'Cancelled'
    }]
    const [DATA, setDATA] = useState(D);
    const [selection, setSelection] = useState(DATA[1]);
    const [updosData, setUpdosData] = useState([]);
    const [sortData, setSortData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFetching, setFetching] = useState(false);
    let dispatch = useDispatch()

    useFocusEffect(
        React.useCallback(() => {
            if (auth) {
                eventCollection.update({
                    new_tip_top:false
                })
                setLoading(true);
                getUpdo()
            }
            return () => {
                //unfocused
            };
        }, [])
    );

    const onRefresh = () => {
        setFetching(true);
        getUpdo()
    }

    const getUpdo = () => {
        getUpdos(user.user_type, token).then(response => {
            if (response.ok) {
                setFetching(false);
                setLoading(false);
                if (response.data?.status === true) {
                    setUpdosData(response.data.data)
                    let data = response.data.data.filter((data) => data.status == 0)
                    let data2 = response.data.data.filter((data) => data.status == 3 && data.payment_status != 1)
                    if (user.user_type == 'Customer' && data2.length > 0) {
                        const newArray = [{ id: 4, title: 'Action Needed' }].concat(D)
                        setDATA(newArray)
                        setSelection({
                            id: 4,
                            title: 'Action Needed'
                        })
                        setSortData(data2)
                    }
                    else if ((data.length) > 0) {
                        setDATA(D)
                        setSelection({
                            id: 0,
                            title: 'In Review'
                        })
                        setSortData(data)
                    }
                    else {
                        let a = D.filter((data) => data.id != 0)
                        setDATA(a)
                        setSelection({
                            id: 1,
                            title: 'Upcoming'
                        })
                        setSortData(response.data.data.filter((data) => data.status == 1))
                    }
                }
                else {
                    setLoading(false);
                    setUpdosData([])
                    setSortData([])
                    let a = D.filter((data) => data.id != 0)
                    setDATA(addEventListener)
                    setSelection({
                        id: 1,
                        title: 'Upcoming'
                    })
                    Toast.show(response.data.message)
                }
            } else {
                setFetching(false);
                setLoading(false);
                setUpdosData([])
                setSortData([])
                let a = D.filter((data) => data.id != 0)
                setDATA(a)
                setSelection({
                    id: 1,
                    title: 'Upcoming'
                })
                Toast.show(response.problem)
            }
        });
    }




    const Item = ({ item }) => {
        if (selection.id == 0) {
           console.log(item.is_proposed) 
            return (
                <TouchableOpacity style={{ backgroundColor: "#F1FBFF", borderRadius: 16, margin: 15, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }} onPress={() => {
                    user.user_type == 'Customer' && item.is_proposed != 0 ? navigation.navigate('ViewUpdo', { appointmentID: item._id }) : null
                }}>
                    <View style={{ flexDirection: "row", padding: 12, alignItems: "center" }}>
                        <Image style={{ width: 68, height: 64, resizeMode: 'cover', borderRadius: 32, borderWidth: 1, borderColor: 'white' }} source={user.user_type == 'Customer' ? { uri: item.provider_id.profile_pic.includes('https://') ? item.provider_id.profile_pic : Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: item.customer_id.profile_pic.includes('https://') ? item.customer_id.profile_pic : Constants.IMG_BASE_URL + item.customer_id.profile_pic }} />
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 19, marginLeft: 12, marginTop: 8 }}>{moment.unix(item.appoint_start).format("MMMM D, h:mma")}</Text>
                    </View>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, marginLeft: 60, marginTop: 12 }}>TipTop with {user.user_type == 'Customer' ? item.provider_id.name : item.customer_id.name}</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 14, marginLeft: 60, marginTop: 4, marginBottom: 16 }}>$159.50 due at time of service</Text>
                    <Image style={{ resizeMode: "contain", width: 20, height: 20, position: "absolute", end: 12, top: 70 }} source={require("../../assets/rightArrow.png")}></Image>
                    {user.user_type == 'Customer' ? null :
                        <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue, width: '70%', alignSelf: "center", marginBottom: 20, height: 40 }]} onPress={() => {
                            console.log(item)
                            appointmentData = {
                                ...appointmentData,
                                id: item._id,
                                proposal_id: item?.proposal_id?._id,
                                customer_id: item.customer_id._id,
                                customerName: item.customer_id.name,
                                customerImg: item.customer_id.profile_pic,
                                customerLoc: item.customer_id?.address?.location,
                                time: item.appoint_start,
                                location: item.customer_id.name,
                                services_data: item?.proposal_id?.services_data,
                                description: item?.proposal_id?.description,
                                note: item?.proposal_id?.note,
                                start_time: item.appoint_start,
                                end_time: item.appoint_end,
                                additionalCharges: item.proposal_id?.additional_charges
                            }
                            dispatch(setAppointmentData(appointmentData))
                            navigation.navigate('UpdoBuildStep1')
                        }} >
                            <Text style={[styles.btnTitleStyle, { color: "white", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Details</Text>
                        </TouchableOpacity>}
                </TouchableOpacity>
            );
        }
        else if (selection.id == 4) {
            return (
                <TouchableOpacity style={{ backgroundColor: "#F1FBFF", borderRadius: 16, margin: 15, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}
                    onPress={() => {
                        navigation.navigate('AppointmentDetails', { appointmentData: item, titleStr: 'Tiptop' })
                    }}>
                    <View style={{ flexDirection: "row", padding: 16 }}>
                        <Image style={{ width: 90, height: 90, resizeMode: 'cover', borderRadius: 45 }} source={user.user_type == 'Customer' ? { uri: item.provider_id.profile_pic.includes('https://') ? item.provider_id.profile_pic : Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: item.customer_id.profile_pic.includes('https://') ? item.customer_id.profile_pic : Constants.IMG_BASE_URL + item.customer_id.profile_pic }} />
                        <View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, marginLeft: 16, marginTop: 4 }}>{user.user_type == 'Customer' ? item.provider_id.name : item.customer_id.name}</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, marginLeft: 16, marginTop: 4 }}>{moment.unix(item.appoint_start).format("MMMM DD, h:mm a")}</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 13, marginLeft: 16, marginTop: 4, color: "#4D4D4D" }}>Total: ${item.proposal_id?.total}</Text>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: "center" }}>
                        <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.blueText, width: '80%', alignSelf: "center", marginVertical: 20 }]} onPress={() => {
                            navigation.navigate('CompletePaymentPage', { appointment: item })
                        }} >
                            <Text style={[styles.btnTitleStyle, { color: "white", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Complete Payment</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (selection.id == 1) {
            {
                return (
                    user.user_type == 'Customer' ? <TouchableOpacity style={{ backgroundColor: "#F1FBFF", borderRadius: 16, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }} onPress={() => {
                        navigation.navigate('AppointmentDetails', { appointmentData: item, titleStr: 'Upcoming Tiptop' })
                    }}>

                        <View style={{ flexDirection: "row", padding: 12, alignItems: "center" }}>
                            <Image style={{ width: 68, height: 64, resizeMode: 'cover', borderRadius: 32, borderWidth: 1, borderColor: 'white' }} source={user.user_type == 'Customer' ? { uri: item.provider_id.profile_pic.includes('https://') ? item.provider_id.profile_pic : Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: item.customer_id.profile_pic.includes('https://') ? item.customer_id.profile_pic : Constants.IMG_BASE_URL + item.customer_id.profile_pic }} />
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 19, marginLeft: 12, marginTop: 8 }}>{moment.unix(item.appoint_start).format("MMMM D, h:mma")}</Text>
                        </View>

                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 16, marginTop: 12 }}>TipTop with {user.user_type == 'Customer' ? item?.customer_id.name : item?.provider_id.name}</Text>
                        <Image style={{ resizeMode: "contain", width: 20, height: 20, position: "absolute", end: 12, top: 70 }} source={require("../../assets/rightArrow.png")}></Image>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginLeft: 16, marginVertical: 12 }}>$ {item?.proposal_id?.total} due at time of service</Text>

                    </TouchableOpacity> : <TouchableOpacity style={{ backgroundColor: "#F1FBFF", borderRadius: 16, margin: 15, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }} onPress={() => {
                        //navigation.navigate('AppointmentDetails', { appointmentData: item,titleStr:'Upcoming Tiptop' })
                    }}>
                        <View style={{ flexDirection: "row", padding: 16 }}>
                            <Image style={{ width: 90, height: 90, resizeMode: 'cover', borderRadius: 45 }} source={user.user_type == 'Customer' ? { uri: item.provider_id.profile_pic.includes('https://') ? item.provider_id.profile_pic : Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: item.customer_id.profile_pic.includes('https://') ? item.customer_id.profile_pic : Constants.IMG_BASE_URL + item.customer_id.profile_pic }} />
                            <View>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, marginLeft: 16, marginTop: 4 }}>{user.user_type == 'Customer' ? item.provider_id.name : item.customer_id.name}</Text>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, marginLeft: 16, marginTop: 4 }}>{moment.unix(item.appoint_start).format("MMMM DD, h:mm a")}</Text>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 13, marginLeft: 16, marginTop: 4, color: "#4D4D4D" }}>Total: ${item.proposal_id?.total}</Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: "center" }}>
                            <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: Colors.themeBlue, width: '40%', alignSelf: "center", marginVertical: 20 }]} onPress={() => {
                                                      navigation.navigate('AppointmentDetails', { appointmentData: item, titleStr: 'Complete Tiptop',markComplete:true })

                           
                            }} >
                                <Text style={[styles.btnTitleStyle, { color: "white", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Complete</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btnViewStyle, { borderColor: Colors.themeBlue, borderWidth: 1, width: '40%', alignSelf: "center", marginVertical: 20 }]} onPress={() => {
                                navigation.navigate('AppointmentDetails', { appointmentData: item, titleStr: 'Upcoming TipTop' })
                            }} >
                                <Text style={[styles.btnTitleStyle, { color: Colors.themeBlue, fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Details</Text>
                            </TouchableOpacity>


                        </View>
                    </TouchableOpacity>)
            }
        }
        else {
            return (
                <TouchableOpacity style={{ backgroundColor: "#F1FBFF", borderRadius: 16, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }} onPress={() => {
                    navigation.navigate('AppointmentDetails', { appointmentData: item, titleStr: '' })
                }}>

                    <View style={{ flexDirection: "row", padding: 12, alignItems: "center" }}>
                        <Image style={{ width: 68, height: 64, resizeMode: 'cover', borderRadius: 32, borderWidth: 1, borderColor: 'white' }} source={user.user_type == 'Customer' ? { uri: item.provider_id.profile_pic.includes('https://') ? item.provider_id.profile_pic : Constants.IMG_BASE_URL + item.provider_id.profile_pic } : { uri: item.customer_id.profile_pic.includes('https://') ? item.customer_id.profile_pic : Constants.IMG_BASE_URL + item.customer_id.profile_pic }} />
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 19, marginLeft: 12, marginTop: 8 }}>{moment.unix(item.appoint_start).format("MMMM D, h:mma")}</Text>
                    </View>

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 16, marginTop: 12 }}>TipTop with {user.user_type == 'Customer' ? item?.customer_id.name : item?.provider_id.name}</Text>
                    <Image style={{ resizeMode: "contain", width: 20, height: 20, position: "absolute", end: 12, top: 70 }} source={require("../../assets/rightArrow.png")}></Image>

                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginLeft: 16, marginVertical: 12 }}>$ {item?.proposal_id?.total} due at time of service</Text>

                </TouchableOpacity>
            )
        }
    };

    const headerItem = ({ item }) => (
        <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: selection.id == item.id ? Colors.themeBlue : "white" }]} onPress={() => {
            setSelection(item)
            if (item.id == 4) {
                setSortData(updosData.filter((data) => data.status == 3 && data.payment_status != 1))
            }
            else if (item.id == 3) {
                setSortData(updosData.filter((data) => data.status == 3))
            }
            else {
                setSortData(updosData.filter((data) => data.status == item.id))
            }

        }} >
            <Text style={[styles.btnTitleStyle, { color: selection.id == item.id ? "white" : "black", fontFamily: selection.id == item.id ? Custom_Fonts.Montserrat_Medium : Custom_Fonts.Montserrat_Regular }]}>{item.title}</Text>
        </TouchableOpacity>
    );
    return (

        <View style={{ backgroundColor: "white", height: "100%" }}>
            <SafeAreaView>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ margin: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24 }}>My TipTops</Text>
                    {/* <Image style={{ width: 28, height: 28, resizeMode: "contain", marginEnd: 20 }} source={require("../../assets/calendarIcon.png")}></Image> */}
                </View>

                <FlatList
                    style={{ marginBottom: 8, marginHorizontal: 4 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={DATA}
                    renderItem={headerItem}
                    keyExtractor={item => item.id}
                />

                <FlatList
                    style={{ marginBottom: 140, marginHorizontal: 8 }}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    data={sortData}
                    renderItem={Item}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={() => onRefresh()}
                        />
                    }
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            {loading && <Loader />}
        </View>


    )
}


export default UpdosTabScreen


const styles = StyleSheet.create({
    btnViewStyle: {
        height: 36,
        marginVertical: 12,
        marginHorizontal: 4,
        borderRadius: 25,
        justifyContent: "center"
    }
    ,
    btnTitleStyle: {
        alignSelf: "center",
        marginHorizontal: 12,
        fontSize: 15
    },
    ratingViewStyle: {
        width: "35%",
        height: 32,
        backgroundColor: Colors.themeBlue,
        marginLeft: 12,
        borderRadius: 25,
        marginTop: 16,
        justifyContent: "center"
    }
});