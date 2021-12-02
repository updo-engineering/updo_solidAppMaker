import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput, Platform } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { updateProvider } from "../apiSauce/HttpInteractor";
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/loader';
import { SetUser } from '../Redux/userDetail'

const CreateProfileStep5 = ({ navigation }) => {
    const [years, setYears] = useState('')
    const [license, setLicense] = useState('')
    const [attend, setAttend] = useState('')
    const [credential, setCredential] = useState('')
    const [loading, setLoading] = useState(false)
    let socialLinks = useSelector(state => state.userReducer).socialLinks
    let servprovider1 = useSelector(state => state.userReducer).serv_provide
    let token = useSelector(state => state.userReducer).token
    let dispatch = useDispatch()

    const storeData = async value => {
        setLoading(true);
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('UserDetail', jsonValue);
            dispatch(SetUser(value.user));
            setTimeout(() => {
                navigation.navigate('UserProfile')
            }, 1200);
        } catch (e) {
            Toast.show(e.message ?? 'Something Went Wrong Please Try Again Later');
        } finally {
            setLoading(false);
        }
    };


    return (
        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Complete your profile" />

                <Text style={{ fontSize: 17, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_SemiBold }}>Credentials</Text>
                <Text style={{ fontSize: 14, marginHorizontal: 18, fontFamily: Custom_Fonts.Montserrat_Regular, marginTop: 16, opacity: 0.6 }}>The TipTop Community is built on trust. In order to list your services on TipTop we need to verify each member has the proper credentials for their work. </Text>
                <View style={{ height: 1, backgroundColor: 'black', opacity: 0.4, margin: 18 }} />

                <View style={{ flexDirection: "row", marginHorizontal: 18 }}>
                    <Text style={{ fontSize: 13, width: '72%', fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 8 }}>Do you have the proper state license(s) to perform your work?</Text>
                    <View style={{ height: 60, width: '28%', flexDirection: "row", justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            setLicense('Yes')
                        }} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                            <Text style={{ fontSize: 10, fontFamily: Custom_Fonts.Montserrat_Medium }}>Yes</Text>
                            <View style={{ width: 16, height: 16, borderWidth: license == 'Yes' ? 0 : 1, borderRadius: 8, borderColor: 'black', backgroundColor: license == 'Yes' ? Colors.themeBlue : null }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setLicense('No')
                        }} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                            <Text style={{ fontSize: 10, fontFamily: Custom_Fonts.Montserrat_Medium }}>No</Text>
                            <View style={{ width: 16, height: 16, borderWidth: license == 'No' ? 0 : 1, borderRadius: 8, borderColor: 'black', backgroundColor: license == 'No' ? Colors.themeBlue : null }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: 'black', opacity: 0.4, margin: 18 }} />

                <View style={{ flexDirection: "row", marginHorizontal: 18 }}>
                    <Text style={{ fontSize: 13, width: '72%', fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 8 }}>If applicable, did you attend a trade school or professional program for your profession?</Text>
                    <View style={{ height: 60, width: '28%', flexDirection: "row", justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            setAttend('Yes')
                        }} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                            <Text style={{ fontSize: 10, fontFamily: Custom_Fonts.Montserrat_Medium }}>Yes</Text>
                            <View style={{ width: 16, height: 16, borderWidth: attend == 'Yes' ? 0 : 1, borderRadius: 8, borderColor: 'black', backgroundColor: attend == 'Yes' ? Colors.themeBlue : null }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setAttend('No')
                        }} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                            <Text style={{ fontSize: 10, fontFamily: Custom_Fonts.Montserrat_Medium }}>No</Text>
                            <View style={{ width: 16, height: 16, borderWidth: attend == 'No' ? 0 : 1, borderRadius: 8, borderColor: 'black', backgroundColor: attend == 'No' ? Colors.themeBlue : null }} />
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={{ height: 1, backgroundColor: 'black', opacity: 0.4, margin: 18 }} />

                <View style={{ flexDirection: "row", marginHorizontal: 18 }}>
                    <Text style={{ fontSize: 13, width: '72%', fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 8 }}>How many years have you practiced your profession?</Text>
                    <View style={{ height: 60, width: '28%' }}>
                        <View style={{
                            borderWidth: 1,
                            borderRadius: 8, height: 36, alignItems: "center", flexDirection: "row", marginLeft: 20, marginRight: 4
                        }}>
                            <TextInput
                                value={years}
                                onChangeText={(t) => {
                                    setYears(t)
                                }}
                                keyboardType={'numeric'}
                                style={[styles.pickerTitleStyle, { marginLeft: 4 }]} placeholder="Year(s)" ></TextInput>
                        </View>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: 'black', opacity: 0.4, margin: 18 }} />
                <Text style={{ fontSize: 13, fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 8, marginLeft: 18 }}>Why are you interested in TopTop? </Text>

                <View style={{
                    margin: 16, borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 8, height: 150, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={credential}
                        onChangeText={(t) => {
                            setCredential(t)
                        }}
                        style={[styles.pickerTitleStyle, { marginLeft: 16, textAlignVertical: 'top', height: 130, marginTop: 20 }]} placeholder="Add a note" ></TextInput>
                </View>


                <TouchableOpacity style={{
                    width: "90%",
                    flexDirection: "row",
                    height: 50,
                    alignItems: "center",
                    backgroundColor: Colors.themeBlue,
                    marginHorizontal: 25,
                    marginTop: 40,
                    marginBottom: 60,
                    borderRadius: 25,
                    justifyContent: "center"
                }} onPress={() => {
                    if (credential == "") {
                        Toast.show('Please enter a note')
                    } else {
                        let data = servprovider1.serv_provide_1
                        let data2 = servprovider1.serv_provide_2
                        let data3 = servprovider1.serv_provide_3
                        let data4 = servprovider1.serv_provide_4
                        let newData = servprovider1.newData
                        if (license == '') {
                            Toast.show("Please provide information about state license");
                        }
                        else if (attend == '') {
                            Toast.show("Please provide information if you attended trade school or professional program");
                        }
                        else if (years == '') {
                            Toast.show("Please provide information for years you have practiced your profession?");
                        }
                        else {
                            setLoading(true);
                            updateProvider(Platform.OS, data.fcm, data.userData.profileImg, data.userData.name, data.userData.aboutMe, data.images,
                                data4.address, data2.services, data3.availability,data4.email, data2.events, credential, socialLinks, newData.gender, newData.age, newData.ethnicity, newData.languages,newData.employment, newData.degree, token, '', data.userData.dob, license, attend,years).then(response => {
                                    if (response.ok) {
                                        setLoading(false);
                                        if (response.data?.status === true) {
                                            Toast.show(response.data?.message)
                                            console.log(response.data?.data)
                                            storeData({
                                                user: response.data?.data
                                            })
                                        } else {
                                            Toast.show(response.data.message)
                                        }
                                    } else {
                                        setLoading(false);
                                        Toast.show(response.problem)
                                    }
                                });
                        }
                    }
                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 16,
                        fontFamily: Custom_Fonts.Montserrat_Medium
                    }}>Submit for Review</Text>
                </TouchableOpacity>
                {loading && <Loader />}

            </SafeAreaView>
        </ScrollView>
    );
}

export default CreateProfileStep5



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
