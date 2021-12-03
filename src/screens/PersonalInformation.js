import React, { useState, useEffect } from "react";
import { Text, ScrollView, Dimensions, Image, View, TextInput, TouchableOpacity, ImageBackground, FlatList } from "react-native";
const { width, height } = Dimensions.get('window');
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { useSelector } from "react-redux"


const PersonalInformation = ({ navigation }) => {

    const user = useSelector(state => state.userReducer.user)
    const [emergencyEditable, setEmergencyEditable] = useState(false)
    const [emailEditable, setEmailEditable] = useState(false)
    const [phoneEditable, setPhoneEditable] = useState(false)
    const [email, setEmail] = useState(user?.email ?? '')
    const [phone, setPhone] = useState(user?.phone ?? '')
    const [emercencyName, setEmercencyName] = useState('')
    const [emercencyEmail, setEmercencyEmail] = useState('')
    const [emercencyPhone, setEmercencyPhone] = useState(user?.phone ?? '')
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
                        setEmailEditable(true)
                    }}>
                        <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, color: Colors.themeBlue }}>{emailEditable ? 'Update' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    value={email}
                    editable={emailEditable}
                    onChangeText={(t) => {
                         setEmail(t)
                    }}
                    style={{ marginLeft: 25, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16,color:'black' }} placeholder="Email" ></TextInput>

                <View style={{ marginHorizontal: 25, height: emailEditable ? 0.5 : 0, backgroundColor: 'black', marginVertical: 8 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17 }}>Phone</Text>
                    <TouchableOpacity onPress={() => {
                        setPhoneEditable(true)
                    }}>
                        <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, color: Colors.themeBlue }}>{phoneEditable ? 'Update' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    value={phone}
                    editable={phoneEditable}
                    keyboardType='number-pad'
                    onChangeText={(t) => {
                         setPhone(t)
                    }}
                    style={{ marginLeft: 25, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16,color:'black' }} placeholder="Phone" ></TextInput>

                <View style={{ marginHorizontal: 25, height: phoneEditable ? 0.5 : 0, backgroundColor: 'black', marginVertical: 8 }} />


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17 }}>Emergency Contact</Text>
                    <TouchableOpacity onPress={() => {
                        setEmergencyEditable(true)
                    }}>
                        <Text style={{ margin: 25, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, color: Colors.themeBlue }}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginHorizontal: emergencyEditable ? 15 : 25, marginVertical: 8, borderColor: "black",
                    borderWidth: emergencyEditable ? 0 : 1, borderBottomWidth: emergencyEditable ? 0.5 : 1,
                    borderRadius: 8, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={emercencyName}
                        editable={emergencyEditable}
                        onChangeText={(t) => {
                          setEmercencyName(t)
                        }}
                        style={{ marginLeft: 8, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15,width:'80%' }} placeholder="First & Last Name" ></TextInput>
                </View>

                <View style={{
                    marginHorizontal: emergencyEditable ? 15 : 25, marginVertical: 8, borderColor: "black",
                    borderWidth: emergencyEditable ? 0 : 1, borderBottomWidth: emergencyEditable ? 0.5 : 1,
                    borderRadius: 8, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={emercencyEmail}
                        editable={emergencyEditable}
                        onChangeText={(t) => {
                            setEmercencyEmail(t)
                        }}
                        style={{ marginLeft: 8, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15,width:'80%' }} placeholder="Email" ></TextInput>
                </View>

                <View style={{
                    marginHorizontal: emergencyEditable ? 15 : 25, marginVertical: 8, borderColor: "black",
                    borderWidth: emergencyEditable ? 0 : 1, borderBottomWidth: emergencyEditable ? 0.5 : 1,
                    borderRadius: 8, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={emercencyPhone}
                        editable={emergencyEditable}
                        onChangeText={(t) => {
                             setEmercencyPhone(t)
                        }}
                        keyboardType='phone-pad'
                        style={{ marginLeft: 8, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15,width:'80%' }} placeholder="Phone Number" ></TextInput>
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

                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 16,
                        fontFamily: Custom_Fonts.Montserrat_Medium
                    }}>Save</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
    );
}

export default PersonalInformation



