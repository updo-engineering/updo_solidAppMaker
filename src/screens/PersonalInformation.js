import React, { useState, useEffect } from "react";
import { Text, ScrollView, Dimensions, Image, View, TextInput, TouchableOpacity, ImageBackground, FlatList } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useSelector, useDispatch } from "react-redux"
import { updateEmergencyContact, sendUpdateEmail, sendUpdatePhone } from "../apiSauce/HttpInteractor";
import _ from 'lodash'
import { SetUser } from '../Redux/userDetail'
import Loader from '../Components/loader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import ModalDropdown from 'react-native-modal-dropdown';
const countryData = require('../Helper/Country.json');

const PersonalInformation = ({ navigation }) => {
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    const ref = useSelector(state => state.userReducer.ref)
    const [emergencyEditable, setEmergencyEditable] = useState(false)
    const [emailEditable, setEmailEditable] = useState(false)
    const [phoneEditable, setPhoneEditable] = useState(false)
    const [email, setEmail] = useState(user?.email ?? '')
    const [code, setCode] = useState(user?.country_code ?? '+1')
    const [phone, setPhone] = useState(user?.phone ?? '')
    let dataC = _.cloneDeep(user?.emergency_contact)
    const [emercencyData, setEmercencyData] = useState(dataC)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const storeData = async value => {
        setLoading(true);
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('UserDetail', jsonValue);
            dispatch(SetUser(value.user));
            setTimeout(() => {
                navigation.goBack()
            }, 1000);
        } catch (e) {
            Toast.show(e.message);
        } finally {
            setLoading(false);
        }
    };
    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(text);
    }

    return (

        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Personal Information" />
                <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17 }}>First Name</Text>
                <Text style={{ marginHorizontal: 25, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, marginBottom: 8 }}>{user?.name.split(" ")[0]}</Text>

                <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17 }}>Last Name</Text>
                <Text style={{ marginHorizontal: 25, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, marginBottom: 8 }}>{user?.name.split(" ").length > 1 ? user?.name.split(" ")[1] : ''}</Text>

                <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17 }}>Birth Date</Text>
                <Text style={{ marginHorizontal: 25, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, marginBottom: 80 }}>{user?.dob ?? ''}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17 }}>Email</Text>
                    <TouchableOpacity onPress={() => {
                        if (emailEditable == false) {
                            setEmailEditable(true)
                        }
                        else {
                            if (validateEmail(email)) {
                                if (email != user?.email) {
                                    sendUpdateEmail(email, user._id).then(response => {
                                        if (response.ok) {
                                            if (response.data?.status === true) {
                                                Toast.show(response.data?.message)
                                                navigation.navigate('VerifyPhoneScreen', { Otp: response.data?.data?.otp, email: email, isUserExist: true, loginSource: 'email', type: 'update' })
                                            }
                                            else {
                                                Toast.show(response.data?.message)
                                            }
                                        } else {
                                            Toast.show(response.problem)
                                        }
                                    });
                                }
                            }
                            else {
                                Toast.show('Enter a valid email address')
                            }
                        }
                    }}>
                        <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, color: Colors.themeBlue }}>{emailEditable ? 'Update' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    value={email}
                    editable={emailEditable}
                    onChangeText={(t) => {
                        setEmail(t)
                    }}
                    style={{ marginLeft: 25, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black' }} placeholder="Email" ></TextInput>

                <View style={{ marginHorizontal: 25, height: emailEditable ? 0.5 : 0, backgroundColor: 'black', marginVertical: 8 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17 }}>Phone</Text>
                    <TouchableOpacity onPress={() => {
                        if (phoneEditable == false) {
                            setPhoneEditable(true)
                        }
                        else {
                            if (phone != user?.phone) {
                                sendUpdatePhone(code, phone, user._id).then(response => {
                                    if (response.ok) {
                                        if (response.data?.status === true) {
                                            Toast.show(response.data?.message)
                                            navigation.navigate('VerifyPhoneScreen', { Otp: response.data?.data?.otp, code: code, phone: phone, isUserExist: true, loginSource: 'phone', type: 'update' })
                                        }
                                        else {
                                            Toast.show(response.data?.message)
                                        }
                                    } else {
                                        Toast.show(response.problem)
                                    }
                                });
                            }
                        }

                    }}>
                        <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, color: Colors.themeBlue }}>{phoneEditable ? 'Update' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ModalDropdown
                        disabled={!phoneEditable}
                        onSelect={(index, country) => {
                            let a = country.split(" ")[country.split(" ").length - 1];
                            let b = a.replace("(", "").replace(")", "")
                            setCode(b)
                        }}
                        textStyle={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 16 }}
                        dropdownStyle={{ width: "90%" }}
                        options={countryData.data.map((data) => data.name + " (+" + data.phonecode + ")")}
                        style={{ marginLeft: 25, width: '12%' }}>
                        <TextInput
                            value={code}
                            editable={false}
                            style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black' }} placeholder="+1" ></TextInput>
                    </ModalDropdown>
                    <TextInput
                        value={phone}
                        editable={phoneEditable}
                        keyboardType='number-pad'
                        onChangeText={(t) => {
                            setPhone(t)
                        }}
                        style={{ marginLeft: 4, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', width: '75%' }} placeholder="Phone" ></TextInput>
                </View>
                <View style={{ marginHorizontal: 25, height: phoneEditable ? 0.5 : 0, backgroundColor: 'black', marginVertical: 8 }} />


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17 }}>Emergency Contact</Text>
                    <TouchableOpacity onPress={() => {
                        setEmergencyEditable(true)
                    }}>
                        <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, color: Colors.themeBlue }}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginHorizontal: emergencyEditable ? 15 : 25, marginVertical: 8, borderColor: "black",
                    borderWidth: emergencyEditable ? 0 : 1, borderBottomWidth: emergencyEditable ? 0.5 : 1,
                    borderRadius: 8, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={emercencyData?.name}
                        editable={emergencyEditable}
                        onChangeText={(t) => {
                            emercencyData.name = t
                            setEmercencyData({ ...emercencyData })
                        }}
                        style={{ marginLeft: 8, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, width: '80%' }} placeholder="First & Last Name" ></TextInput>
                </View>

                <View style={{
                    marginHorizontal: emergencyEditable ? 15 : 25, marginVertical: 8, borderColor: "black",
                    borderWidth: emergencyEditable ? 0 : 1, borderBottomWidth: emergencyEditable ? 0.5 : 1,
                    borderRadius: 8, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={emercencyData?.email}
                        editable={emergencyEditable}
                        onChangeText={(t) => {
                            emercencyData.email = t
                            setEmercencyData({ ...emercencyData })
                        }}
                        style={{ marginLeft: 8, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, width: '80%' }} placeholder="Email" ></TextInput>
                </View>

                <View style={{
                    marginHorizontal: emergencyEditable ? 15 : 25, marginVertical: 8, borderColor: "black",
                    borderWidth: emergencyEditable ? 0 : 1, borderBottomWidth: emergencyEditable ? 0.5 : 1,
                    borderRadius: 8, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={emercencyData?.phone}
                        editable={emergencyEditable}
                        onChangeText={(t) => {
                            emercencyData.phone = t
                            setEmercencyData({ ...emercencyData })
                        }}
                        keyboardType='phone-pad'
                        style={{ marginLeft: 8, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, width: '80%' }} placeholder="Phone Number" ></TextInput>
                </View>

                <TouchableOpacity style={{
                    width: "90%",
                    flexDirection: "row",
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: Colors.themeBlue,
                    marginHorizontal: 25,
                    marginTop: 25,
                    marginBottom: 40,
                    borderRadius: 25,
                    justifyContent: "center"
                }} onPress={() => {
                    updateEmergencyContact(user.user_type == 'Customer', token, JSON.stringify(emercencyData)).then(response => {
                        if (response.ok) {
                            if (response.data?.status === true) {
                                Toast.show(response.data?.message)
                                storeData({ user: response.data?.data, ref: ref, token: token })
                            }
                            else {
                                Toast.show(response.data?.message)
                            }
                        } else {

                            Toast.show(response.problem)
                        }
                    });
                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 16,
                        fontFamily: Custom_Fonts.Montserrat_Medium
                    }}>Save</Text>
                </TouchableOpacity>

            </SafeAreaView>
            {loading && <Loader />}
        </ScrollView>
    );
}

export default PersonalInformation



