import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { Colors } from "../Colors/Colors";
import { growBrand } from "../apiSauce/HttpInteractor";
import { useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';
import Loader from '../Components/loader'

const StartTiptopJourney = (props) => {
    const user = useSelector(state => state.userReducer.user)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [service, setService] = useState('')
    const [listService, setListService] = useState('')
    const [loading, setLoading] = useState(false)

    return (
        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>

            <SafeAreaView>
                <TopHeaderView title={"Start your TipTop Journey"} />

                {isSubmitted ? <View style={{
                    backgroundColor: 'white', width: "92%", alignSelf: 'center', elevation: 4, borderRadius: 12, marginBottom: 20, shadowColor: "grey",
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 2, height: 5 }, shadowColor: "grey"
                }} >
                    <Image style={{ alignSelf: 'center', width: 130, height: 130, resizeMode: 'cover', marginTop: 8 }} source={require('../assets/logoBlue.png')} />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, alignSelf: "center", marginTop: -25 }}>You have successfully submitted your profile!</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 14, alignSelf: "center", marginVertical: 40, marginHorizontal: 25, textAlign: 'center' }}>A member of the TipTop Team will be in touch shortly!</Text>

                </View> : <View style={{ backgroundColor: 'white' }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 8 }}>Which Services do you provide?</Text>
                    <View style={{ height: 140, borderColor: 'black', marginHorizontal: 16, marginVertical: 16, borderWidth: 1, borderRadius: 16, padding: 8 }}>
                        <TextInput placeholder='List your services here.' value={service} onChangeText={t => { setService(t) }} multiline={true} style={{ width: '100%', height: '100%', textAlignVertical: 'top' }} />

                    </View>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: "black", fontSize: 15, marginHorizontal: 16, marginTop: 8 }}>Why do you want to list your services?</Text>
                    <View style={{ height: 140, borderColor: 'black', marginHorizontal: 16, marginVertical: 16, borderWidth: 1, borderRadius: 16, padding: 8 }}>
                        <TextInput placeholder='What’s your ‘Why’?' value={listService} onChangeText={t => { setListService(t) }} multiline={true} style={{ width: '100%', height: '100%', textAlignVertical: 'top' }} />
                    </View>

                    <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 21, color: 'black', alignSelf: "center" }}>Dream big. Start small.</Text>
                    <Text style={{ marginLeft: 16, fontFamily: Custom_Fonts.ITALIC, fontSize: 15, color: Colors.themeBlue, alignSelf: "center", fontSize: 21 }}>Above all, start.</Text>

                </View>}




                <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                    if (isSubmitted) {
                        props.navigation.goBack()
                        props.navigation.navigate('HomeTabScreen');
                    }
                    else {
                        if (service.trim() == '') {
                            Toast.show('Please enter Which Services do you provide?')
                        }
                        else if (listService.trim() == '') {
                            Toast.show('Please enter Why do you want to list your services?')
                        }
                        else {
                            let a = [{ "key": 'Which Services do you provide?', "value": service }, { "key": 'Why do you want to list your services?', "value": listService }]
                            setLoading(true)
                            growBrand(user.user_type, user._id, 'Start TipTop Journey', JSON.stringify(a)).then(response => {
                                if (response.ok) {
                                  setLoading(false)
                                  if (response.data?.status === true) {
                                    setIsSubmitted(true);
                                  }
                                  else {
                                    Toast.show(response.data.message)
                                  }
                                } else {
                                  setLoading(false)
                                  Toast.show(response.problem)
                                }
                              });
                        }
                    }
                }} >
                    <Text style={styles.btnTitleStyle}>{isSubmitted ? 'Home' : 'Submit'}</Text>
                </TouchableOpacity>


            </SafeAreaView>
            {loading && <Loader />}

        </ScrollView>

    );
}

export default StartTiptopJourney

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical: 40,
        borderRadius: 25,
        justifyContent: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontFamily: Custom_Fonts.Montserrat_Medium
    }
});
