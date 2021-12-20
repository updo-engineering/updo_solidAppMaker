import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { setServProv } from "../Redux/userDetail";
import _ from 'lodash'
import { updateServiceProvider } from "../apiSauce/HttpInteractor";
import Loader from '../Components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetUser } from '../Redux/userDetail'
import Toast from 'react-native-simple-toast';

const DATA = [
    {
        day: 'Monday',
        start_time: '9:00 AM',
        end_time: '5:00 PM',
        isAvailable: 1
    },
    {
        day: 'Tuesday',
        start_time: '9:00 AM',
        end_time: '5:00 PM',
        isAvailable: 1
    },
    {
        day: 'Wednesday',
        start_time: '9:00 AM',
        end_time: '5:00 PM',
        isAvailable: 1
    },
    {
        day: 'Thursday',
        start_time: '9:00 AM',
        end_time: '5:00 PM',
        isAvailable: 1
    },
    {
        day: 'Friday',
        start_time: '9:00 AM',
        end_time: '5:00 PM',
        isAvailable: 1
    },
    {
        day: 'Saturday',
        start_time: '9:00 AM',
        end_time: '5:00 PM',
        isAvailable: 1
    },
    {
        day: 'Sunday',
        start_time: '9:00 AM',
        end_time: '5:00 PM',
        isAvailable: 1
    },
];



const CreateProfileStep3 = ({ navigation, route }) => {

    const [id, setId] = useState(0)
    const [endid, setEndId] = useState(0)
    const [data, setData] = useState(DATA)
    const [loading, setLoading] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    let servprovider1 = useSelector(state => state.userReducer).serv_provide
    let socialLinks = useSelector(state => state.userReducer).socialLinks
    let token = useSelector(state => state.userReducer).token
    let ref = useSelector(state => state.userReducer).ref
    let user = useSelector(state => state.userReducer).user
    let isUpdate = route.params?.isUpdate ?? false

    let dispatch = useDispatch()

    useEffect(() => {
        isUpdate ? setData(user.availability) : null
    }, [])

    const storeData = async value => {
        setLoading(true);
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('UserDetail', jsonValue);
            dispatch(SetUser(value.user));
            setTimeout(() => {
                navigation.replace('UserProfile')
            }, 1000);
        } catch (e) {
            Toast.show('Something Went Wrong Please Try Again Later');
        } finally {
            setLoading(false);
        }
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    };

    const handleConfirm = (date) => {
        console.log(moment(date).format('h:mm A'))
        let dataC = _.cloneDeep(data)
        dataC[id].start_time = moment(date).format('h:mm A')
        setData(dataC)
        hideDatePicker()
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm1 = (date) => {
        let dataC = _.cloneDeep(data)
        dataC[endid].end_time = moment(date).format('h:mm A')
        setData(dataC)
        hideDatePicker1()
    };

   

    const EventItem = ({ item, index }) => (
        <View style={{
            flexDirection: "row", height: 32, margin: 16, alignItems: "center"
        }}>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, width: "13%" }}>{item.day.substring(0, 3).toUpperCase()}</Text>

            <TouchableOpacity
                onPress={() => {
                    setDatePickerVisibility(true)
                    setId(index)
                }}

                style={[styles.pickerStyle, { marginLeft: 16, justifyContent: 'center', alignItems: 'center' }]}>

                <Text style={{
                    textAlign: 'center', fontSize: 12,
                    fontFamily: Custom_Fonts.Montserrat_Medium,
                }}>{item.start_time.length === 0 ? '00 : 00' : item.start_time}</Text>

            </TouchableOpacity>


            <View style={{ width: 15, height: 1, backgroundColor: 'black', marginHorizontal: 8 }} />

            <TouchableOpacity
                onPress={() => {
                    setDatePickerVisibility1(true);
                    setEndId(index);
                    console.log("ffffddg")
                }}
                style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', }]}>
                <Text style={{
                    textAlign: 'center', fontSize: 12,
                    fontFamily: Custom_Fonts.Montserrat_Medium,
                }}>{item.end_time.length === 0 ? '00:00' : item.end_time}</Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {
                    let dataC = _.cloneDeep(data)
                    dataC[index].isAvailable = (dataC[index].isAvailable == 1 ? 0 : 1)
                    setData(dataC)
                }}
                style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', width: 38, marginLeft: 8, backgroundColor: item.isAvailable ? null : '#F6A5B7' }]}>
                <Text style={{
                    textAlign: 'center', fontSize: 12,
                    fontFamily: Custom_Fonts.Montserrat_Medium, color: item.isAvailable == 1 ? 'black' : 'white', opacity: item.isAvailable == 1 ? 0.5 : 1
                }}>NA</Text>
            </TouchableOpacity>


        </View>
    );

    return (
        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title={isUpdate ? 'Edit Profile' : "Complete your profile"} />

                <Text style={{ fontSize: 20, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 16 }}>General availability</Text>

                <FlatList
                    key="event"
                    style={{ marginTop: 20 }}
                    horizontal={false}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={EventItem}
                    keyExtractor={item => item.id}
                />



                <TouchableOpacity style={{
                    width: "90%",
                    flexDirection: "row",
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: Colors.themeBlue,
                    marginHorizontal: 25,
                    marginTop: 25,
                    marginBottom: 60,
                    borderRadius: 25,
                    justifyContent: "center"
                }} onPress={() => {

                    let _data = {
                        availability: data,

                    }
                    servprovider1 = {
                        ...servprovider1,
                        serv_provide_3: _data
                    }

                    if (isUpdate) {
                        let data1 = servprovider1.serv_provide_1
                        let data2 = servprovider1.serv_provide_2
                        setLoading(true)
                        updateServiceProvider(data1.userData.profileImg, data1.userData.name, data1.userData.aboutMe, data1.images, data1.location, token, data1.userData.dob, socialLinks, data2.services, data2.events, data).then(response => {
                            if (response.ok) {
                                setLoading(false)
                                if (response.data?.status === true) {
                                    Toast.show(response.data.message)
                                    console.log(response.data?.data)
                                    storeData({
                                        user: response.data?.data,
                                        ref: ref, token: token
                                    })
                                } else {
                                    setLoading(false)
                                    Toast.show(response.data.message)
                                }
                            } else {
                                setLoading(false)
                                Toast.show(response.problem)
                            }
                        });
                    }
                    else {
                        dispatch(setServProv(servprovider1))
                        navigation.navigate('CreateProfileStep4')
                    }

                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 16,
                        fontFamily: Custom_Fonts.Montserrat_Medium
                    }}>{isUpdate ? 'Save' : 'Continue'}</Text>
                </TouchableOpacity>

            </SafeAreaView>
            {loading && <Loader />}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale="en_GB"

            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible1}
                mode="time"
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
                locale="en_GB"
            />

        </ScrollView>
    );
}

export default CreateProfileStep3




const styles = StyleSheet.create({

    btnViewStyle: {
        width: 110,
        flexDirection: "row",
        height: 36,
        backgroundColor: Colors.themeBlue,
        margin: 18,
        borderRadius: 8,
        justifyContent: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 12,
        marginHorizontal: 4,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    descripTextStyle: {
        fontSize: 16,
        margin: 18,
        fontFamily: Custom_Fonts.Montserrat_Regular
    },
    item: {
        backgroundColor: Colors.themeBlue,
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 8,
        minWidth: 120,
        height: 74,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginEnd: 16,
        color: "white",
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
    pickerStyle: {
        flexDirection: "row",
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        width: "31%"

    },
    pickerTitleStyle: {
        marginLeft: 4,
        paddingVertical: 0,
        width: "100%",
        color: "black",
        fontSize: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold,


    },

});
