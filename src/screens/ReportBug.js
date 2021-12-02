import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, View, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { contactSupport } from "../apiSauce/HttpInteractor";
import { useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';
import Loader from '../Components/loader';

const ReportBug = ({ navigation }) => {
    const user = useSelector(state => state.userReducer.user)
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    return (
        <View style={{width: '100%', height: '100%',backgroundColor: 'white'}}>
        <SafeAreaView>
            <TopHeaderView title="Report a Bug" />
            {isSubmitted ? <View><View style={{
                backgroundColor: 'white', width: "92%", alignSelf: 'center', elevation: 4, borderRadius: 12, marginBottom: 20, shadowColor: "grey",
                shadowOpacity: 0.5,
                shadowOffset: { width: 2, height: 5 }, shadowColor: "grey"
            }} >
                <Image style={{ alignSelf: 'center', width: 130, height: 130, resizeMode: 'cover', marginTop: 8 }} source={require('../assets/logoBlue.png')} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, alignSelf: "center", marginTop: -25 }}>Thank you for your note!</Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 14, alignSelf: "center", marginVertical: 40, marginHorizontal: 25, textAlign: 'center' }}>A member of the TipTop Team will be in touch shortly!</Text>
            </View>
                <TouchableOpacity style={[styles.btnViewStyle, { width: '90%', height: 50, marginTop: 60 }]} onPress={() => {
                    if (isSubmitted) {
                        navigation.goBack()
                        navigation.navigate('HomeTabScreen');
                    }
                    else {
                        setIsSubmitted(true);
                    }
                }} >
                    <Text style={styles.btnTitleStyle}>{'Home'}</Text>
                </TouchableOpacity>
            </View>

                :
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, marginHorizontal: 20, fontSize: 15, marginTop: 8, marginBottom: 40 }}>
                        <Text>If this is a support request outside of feedback or product-related issues, please </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('ContactSupport')}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, color: Colors.themeBlue }}>Contact Support.</Text>
                        </TouchableOpacity>
                    </Text>

                    <View style={{ height: 350, borderRadius: 16, backgroundColor: "#18A7C70D", marginHorizontal: 16, borderWidth: 1, borderColor: Colors.themeBlue }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginHorizontal: 20, marginVertical: 30, fontSize: 16 }}>
                            Report a Bug </Text>
                        <View style={{ height: 175, borderRadius: 16, backgroundColor: "white", marginHorizontal: 12, borderWidth: 1, borderColor: Colors.themeBlue, padding: 12 }}>
                            <TextInput placeholder="We’re here for you!"
                                value={msg}
                                onChangeText={(t) => {
                                    setMsg(t)
                                }} />
                        </View>
                        <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                                setLoading(true)
                               contactSupport(user._id,user.user_type,"Report Bug",msg).then(response => {
                                if (response.ok) {
                                  if (response.data?.status === true) {
                                    setLoading(false);
                                        setIsSubmitted(true)
                                  }
                                  else {
                                    setLoading(false);
                                    Toast.show(response.data.message)
                                  }
                                } else {
                                    setLoading(false);
                                  Toast.show(response.problem)
                                }
                              }).catch((error) => Toast.show(error.message));
                        }} >
                            <Text style={styles.btnTitleStyle}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            {loading && <Loader />}

        </SafeAreaView>
        </View>
    );
}

export default ReportBug

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "40%",
        flexDirection: "row",
        height: 38,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical: 22,
        borderRadius: 25,
        justifyContent: "center", alignSelf: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 15,
        marginHorizontal: 12,
        fontFamily: Custom_Fonts.Montserrat_Medium
    }
});
