import React,{ useState} from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, ScrollView, Image,TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import {appFeedback } from "../apiSauce/HttpInteractor";
import { useSelector } from "react-redux"
import Toast from 'react-native-simple-toast';
import Loader from '../Components/loader';
const ProductFeedBack = ({navigation}) => {
    const user = useSelector(state => state.userReducer.user)
    const [msg,setMsg] = useState("")
    const [experience,setExperience] = useState("")
    const [would_use_again,setWould_use_again] = useState("")
    const [recommend,setRecommend] = useState("")

    const [loading,setLoading] = useState(false)
    return (
        <ScrollView >
        <SafeAreaView>

            <TopHeaderView title="Give Product Feedback" />

            <View style={{ borderRadius: 16, backgroundColor: "#18A7C70D", marginHorizontal: 16, borderWidth: 1, borderColor: Colors.themeBlue,marginBottom:40 }}>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, marginHorizontal: 20, marginVertical: 30, fontSize: 14 }}>
                    We hope you loved your Updo. Let us know how your experience was! </Text>
                <View style={{ height: 1, backgroundColor: Colors.greyColor, marginHorizontal: 20, marginBottom: 30 }}></View>

                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20 }}>How do you Updo?</Text>
                <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
                    <View style={[styles.btnClearBGStyle, { height: 34, width: "36%",backgroundColor: user.user_type == "Customer" ? Colors.themeBlue : null}]} >
                        <Text style={[styles.btnTitleStyle, { color: user.user_type == "Customer" ? 'white' :Colors.themeBlue }]}>User</Text>
                    </View>

                    <View style={[styles.btnClearBGStyle, { height: 34, width: "36%",backgroundColor: user.user_type != "Customer" ? Colors.themeBlue : null }]} >
                        <Text style={[styles.btnTitleStyle, { color: user.user_type != "Customer" ? 'white' :Colors.themeBlue }]}>Updoer</Text>
                    </View>
                </View>

                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20 }}>How was your experience?</Text>
                <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
                    <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                        setExperience("Good")
                    }} >
                        <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={experience == 'Good' ? require("../assets/likeHighlight.png"):require("../assets/like.png")}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                       setExperience("Bad")
                    }} >
                        <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={experience == 'Bad' ? require("../assets/dislikeHighlight.png"):require("../assets/dislike.png")}></Image>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20 }}>Would you use Updo again?</Text>
                <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
                    <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                        setWould_use_again("Yes")
                    }} >
                        <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={would_use_again == 'Yes' ? require("../assets/likeHighlight.png"):require("../assets/like.png")}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                       setWould_use_again("No")
                    }} >
                        <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={would_use_again == 'No' ? require("../assets/dislikeHighlight.png"):require("../assets/dislike.png")}></Image>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20 }}>Would you recommend Updo to
                    your friend?</Text>
                <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
                    <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                       setRecommend("Yes")
                    }} >
                        <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={recommend == 'Yes' ? require("../assets/likeHighlight.png"):require("../assets/like.png")}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: 12, marginVertical: 16 }} onPress={() => {
                       setRecommend("No")
                    }} >
                        <Image style={{ resizeMode: "contain", width: 48, height: 48 }} source={recommend == 'No' ? require("../assets/dislikeHighlight.png"):require("../assets/dislike.png")}></Image>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, marginHorizontal: 20,marginVertical:16}}>Leave your feedback for us</Text>


                <View style={{ height: 175, borderRadius: 16, backgroundColor: "white", marginHorizontal: 16, borderWidth: 1, borderColor: Colors.themeBlue, padding: 16 }}>
                    <TextInput placeholder="Your feedback is very important to us."
                    value={msg}
                    onChangeText={(t)=>{
                        setMsg(t)
                    }} />
                </View>
                <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                     setLoading(true)
                     appFeedback(user._id, user.user_type,experience,would_use_again,recommend,msg).then(response => {
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
        </ScrollView>
    );
}

export default ProductFeedBack

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
    },
    btnClearBGStyle: {
        width: "40%",
        flexDirection: "row",
        height: 38,
        borderColor: Colors.themeBlue,
        borderWidth: 1,
        marginHorizontal: 8,
        marginVertical: 22,
        borderRadius: 25,
        justifyContent: "center"
    },

});
