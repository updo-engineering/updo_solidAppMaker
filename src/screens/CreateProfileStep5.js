import React, { useState,useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput, Platform } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { registerProvider } from "../apiSauce/HttpInteractor";
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-simple-toast';


const CreateProfileStep5 = ({ navigation }) => {
    const[fcmTOKEN,setFcmToken] = useState("dummy")
    useEffect(() => {
        GetToken()
     },[])
    const [credential, setCredential] = useState('')
    let servprovider1 = useSelector(state => state.userReducer).serv_provide
    console.log(servprovider1, 'servvvvvvvv1234')
    const GetToken = async() => {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            const token = await messaging().getToken()
            
            setFcmToken(token)
          } 
    }
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
                    <Text style={styles.btnTitleStyle}>Updoer Profile</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 17, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 16 }}>Credentials</Text>

                <View style={{
                    margin: 16, borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 25, height: 48, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput
                        value={credential}
                        onChangeText={(t) => {
                            setCredential(t)
                        }}
                        style={[styles.pickerTitleStyle, { marginLeft: 16 }]} placeholder="Add credentials" ></TextInput>
                </View>


                <TouchableOpacity style={{
                    width: "90%",
                    flexDirection: "row",
                    height: 50,
                    backgroundColor: Colors.themeBlue,
                    marginHorizontal: 25,
                    marginTop: 40,
                    marginBottom: 60,
                    borderRadius: 25,
                    justifyContent: "center"
                }} onPress={() => {
                    if (credential == "")
                    {
                        Toast.show('Please enter credentials')
                    }else{
                    let data = servprovider1.serv_provide_1
                    let data2 = servprovider1.serv_provide_2
                    let data3 = servprovider1.serv_provide_3
                    let data4 = servprovider1.serv_provide_4
                     registerProvider(data.countryCode,data.phone,Platform.OS,data.fcm,"phone",data.userData.profileImg,data.userData.name,data.userData.aboutMe,data.images,
                     data4.address,data2.services,data3.availability,data2.events,data4.email,data3.note,credential).then(response => {
                        if (response.ok) {
                          if (response.data?.status === true) {
                            Toast.show(response.data.message)
                            navigation.navigate('ProfileSubmitted')
                          } else {
                            Toast.show(response.data.message)
                          }
                        } else {
                          Toast.show(response.problem)
                        }
                      });}
                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 17,
                        fontFamily: Custom_Fonts.Montserrat_SemiBold
                    }}>Apply to be an Updoer</Text>
                </TouchableOpacity>

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
