import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { Colors } from "../Colors/Colors";
import { growBrand } from "../apiSauce/HttpInteractor";
import { useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';
import Loader from '../Components/loader'

const PartnerWithUs = (props) => {
    const user = useSelector(state => state.userReducer.user)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [service, setService] = useState('')
    const [listService, setListService] = useState('')
    const [loading, setLoading] = useState(false)
    let isGrow = props.route.params?.isGrow ?? false
    return (
        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>

            <SafeAreaView>
                <TopHeaderView title={isGrow ? "Grow your brand" : "Partner with us"} />

                {isSubmitted ? <View style={{
                    backgroundColor: 'white', width: "92%", alignSelf: 'center', elevation: 4, borderRadius: 12, marginBottom: 20, shadowColor: "grey",
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 2, height: 5 }, shadowColor: "grey"
                }} >
                    <Image style={{ alignSelf: 'center', width: 130, height: 130, resizeMode: 'cover', marginTop: 8 }} source={require('../assets/logoBlue.png')} />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, alignSelf: "center", marginTop: -25 }}>Thank you for reaching out!</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 14, alignSelf: "center", marginVertical: 40, marginHorizontal: 25, textAlign: 'center' }}>A member of the TipTop Team will be in touch shortly!</Text>

                </View> : <View style={{ backgroundColor: 'white' }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, marginHorizontal: 16, marginBottom: 20 }}>{isGrow ? 'Share your story!' : 'Let’s get in touch!'}</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, marginHorizontal: 16, fontSize: 15, color: 'black', opacity: 0.4 }}>{isGrow ? 'We want to highlight your story on the Tiptop Podcast! Tell us more about you and we’ll be in touch soon.' : 'The team at Tiptop is dedicated to building meaningful partnerships with organizations who align with our mission and values.'}</Text>
                    <View style={{ height: 0.5, backgroundColor: 'black', marginHorizontal: 16, marginVertical: 20 }} />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 8 }}>About You</Text>
                    <View style={{ height: 180, borderColor: 'black', marginHorizontal: 16, marginVertical: 25, borderWidth: 1, borderRadius: 16, padding: 8 }}>
                        <TextInput placeholder='Add a note' value={service} onChangeText={t => { setService(t) }} multiline={true} style={{ width: '100%', height: '100%', textAlignVertical: 'top' }} />

                    </View>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, color: "black", fontSize: 16, marginHorizontal: 16, marginTop: 8 }}>{isGrow ? "Why are you interested in the podcast?" : "Why are you interested in Tiptop?"}</Text>
                    <View style={{ height: 180, borderColor: 'black', marginHorizontal: 16, marginVertical: 25, borderWidth: 1, borderRadius: 16, padding: 8 }}>
                        <TextInput placeholder='Add a note'  value={listService} onChangeText={t => { setListService(t) }} multiline={true} style={{ width: '100%', height: '100%', textAlignVertical: 'top' }} />
                    </View>
                </View>}


                <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                    if (isSubmitted) {
                        props.navigation.goBack()
                        props.navigation.navigate('HomeTabScreen');
                    }
                    else {
                        if (service.trim() == '') {
                            let msg = 'Please enter something about You'
                            Toast.show(msg)
                        }
                        else if (listService.trim() == '') {
                            let msg = 'Please enter ' + isGrow  ? 'Why are you interested in the podcast?' :'Why are you interested in Tiptop?'
                            Toast.show(msg)
                        }
                        else {
                            let a = [{ "key":'About You', "value": service }, { "key": isGrow  ? 'Why are you interested in the podcast?' :'Why are you interested in Tiptop?', "value": listService }]
                            setLoading(true)
                            growBrand(user.user_type, user._id, isGrow ? 'Grow your brand' : 'Partner with us', JSON.stringify(a)).then(response => {
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

export default PartnerWithUs

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical: 20,
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
