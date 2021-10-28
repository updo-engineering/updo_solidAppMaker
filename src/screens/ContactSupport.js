import React,{ useState} from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { contactSupport } from "../apiSauce/HttpInteractor";
import { useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';
import Loader from '../Components/loader';

const ContactSupport = ({navigation}) => {
    const user = useSelector(state => state.userReducer.user)
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    return (
        <SafeAreaView>
            <TopHeaderView title="Contact Support" />


            <View style={{ height: 350, borderRadius: 16, backgroundColor: "#18A7C70D", marginHorizontal: 16, borderWidth: 1, borderColor: Colors.themeBlue }}>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, marginHorizontal: 20, marginVertical: 30, fontSize: 16 }}>
                    Contact Support </Text>
                <View style={{ height: 175, borderRadius: 16, backgroundColor: "white", marginHorizontal: 12, borderWidth: 1, borderColor: Colors.themeBlue, padding: 12 }}>
                    <TextInput placeholder="We’re here for you!"
                        value={msg}
                        onChangeText={(t) => {
                            setMsg(t)
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                    setLoading(true)
                    contactSupport(user._id, user.userType, "Support", msg).then(response => {
                        if (response.ok) {
                            if (response.data?.status === true) {
                                setLoading(false);
                                Toast.show(response.data.message)
                                setTimeout(() => {
                                    navigation.pop()
                                }, 1200);
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
            {loading && <Loader/>}


        </SafeAreaView>
    );
}

export default ContactSupport

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "40%",
        flexDirection: "row",
        height: 38,
        backgroundColor: Colors.blueText,
        marginHorizontal: 18,
        marginVertical: 22,
        borderRadius: 25,
        justifyContent: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        marginHorizontal: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    }
});
