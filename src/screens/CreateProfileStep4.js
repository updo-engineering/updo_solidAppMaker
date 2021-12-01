import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, ScrollView, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-simple-toast';

import { setServProv } from "../Redux/userDetail";
import { validateEmail } from "../apiSauce/HttpInteractor";
import Loader from '../Components/loader';


const CreateProfileStep4 = ({ navigation }) => {
    let user = useSelector(state => state.userReducer).user
    const [email, setEmail] = useState(user.email ?? '')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const ty = useSelector(state => state.userReducer.type)
    const [loading,setLoading] = useState(false)

    let servprovider1 = useSelector(state => state.userReducer).serv_provide
    console.log(servprovider1, 'servvvvvvvv1234')
    let dispatch = useDispatch()

    return (
        <ScrollView
            style={{ width: "100%", height: "100%" }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Create your profile" />
                <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                    //action
                }} >
                    <Text style={styles.btnTitleStyle}>TipToper Profile</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 17, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 16 }}>Email</Text>

                <View style={{
                    margin: 16, borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 25, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={email}
                        onChangeText={(t) => {
                            setEmail(t)
                        }}
                        style={[styles.pickerTitleStyle, { textAlign: "center" }]} placeholder="Add Email" ></TextInput>
                </View>

                <Text style={{ fontSize: 17, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 40 }}>Address</Text>
                <View style={{
                    marginHorizontal: 16, borderColor: "black",
                    borderWidth: 1,
                    marginTop: 16,
                    borderRadius: 25, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={address1}
                        onChangeText={(t) => {
                            setAddress1(t)
                        }}
                        style={[styles.pickerTitleStyle, { marginLeft: 16 }]} placeholder="Address Line 1" ></TextInput>
                </View>
                <View style={{
                    marginHorizontal: 16, borderColor: "black",
                    borderWidth: 1,
                    marginTop: 8,
                    borderRadius: 25, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={address2}
                        onChangeText={(t) => {
                            setAddress2(t)
                        }}
                        style={[styles.pickerTitleStyle, { marginLeft: 16 }]} placeholder="Address Line 2" ></TextInput>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={{
                        marginHorizontal: 16, borderColor: "black",
                        borderWidth: 1,
                        width: "43%",
                        marginTop: 8,
                        borderRadius: 25, height: 48, alignItems: "center", flexDirection: "row"
                    }}>
                        <TextInput
                            value={city}
                            onChangeText={(t) => {
                                setCity(t)
                            }}
                            style={[styles.pickerTitleStyle, { marginLeft: 16 }]} placeholder="City" ></TextInput>
                    </View>

                    <View style={{
                        borderColor: "black",
                        borderWidth: 1,
                        width: "43%",
                        marginTop: 8,
                        borderRadius: 25, height: 48, alignItems: "center", flexDirection: "row"
                    }}>
                        <TextInput
                            value={state}
                            onChangeText={(t) => {
                                setState(t)
                            }}
                            style={[styles.pickerTitleStyle, { marginLeft: 16 }]} placeholder="State" ></TextInput>
                    </View>
                </View>
                <View style={{
                    marginHorizontal: 16, borderColor: "black",
                    borderWidth: 1,
                    marginTop: 8,
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 25, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={zipcode}
                        onChangeText={(t) => {
                            setZipcode(t)
                        }}
                        keyboardType={'numeric'}
                        style={[styles.pickerTitleStyle, { textAlign: "center" }]} placeholder="Zip Code" ></TextInput>
                </View>

                <TouchableOpacity style={{
                    width: "90%",
                    flexDirection: "row",
                    height: 50,
                    backgroundColor: Colors.themeBlue,
                    marginHorizontal: 25,
                    marginTop: 80,
                    marginBottom: 60,
                    borderRadius: 25,
                    justifyContent: "center"
                }} onPress={() => {
                    setLoading(true);
                    validateEmail(email, ty).then(response => {
                        if (response.ok) {
                            if (response.data?.status === true) {
                                if (address1 == "") {
                                    Toast.show('Please enter address 1')
                                }
                                else if (address2 == "") {
                                    Toast.show('Please enter address 2')
                                }
                                else if (city == "") {
                                    Toast.show('Please enter city')
                                }
                                else if (state == "") {
                                    Toast.show('Please enter state')
                                }
                                else if (zipcode == "") {
                                    Toast.show('Please enter zipcode')
                                }
                                else {
                                    let _data = {
                                        email: email,
                                        address: { address_line_1: address1, address_line_2: address2, city: city, state: state, zip_code: zipcode, location: servprovider1.serv_provide_1.location.location, lat: servprovider1.serv_provide_1.location.lat, lon: servprovider1.serv_provide_1.location.long }
                                    }
                                    servprovider1 = {
                                        ...servprovider1,
                                        serv_provide_4: _data
                                    }
                                    dispatch(setServProv(servprovider1))
                                    navigation.navigate('CreateProfileStep5')
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
                    }).catch((error) =>   {Toast.show(error.message)
                        setLoading(false);});

                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 17,
                        fontFamily: Custom_Fonts.Montserrat_SemiBold
                    }}>Apply to be an TipToper</Text>
                </TouchableOpacity>
                {loading && <Loader/>}

            </SafeAreaView>
        </ScrollView>
    );
}

export default CreateProfileStep4



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
        height: 26,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 13,
        alignItems: "center",
        width: "12%"

    },
    pickerTitleStyle: {

        paddingVertical: 0,
        width: "100%",
        color: "black",
        fontSize: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold,


    },

});
