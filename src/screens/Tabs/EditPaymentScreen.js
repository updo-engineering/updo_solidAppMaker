import React,{useState} from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../TopHeader/TopHeaderView"
import { SetDefaultCardID } from '../../Redux/userDetail'
import { useSelector } from 'react-redux'
import store from "../../Redux/store"
import Toast from 'react-native-simple-toast';
import { deleteCard} from "../../apiSauce/HttpInteractor";

import Loader from '../../Components/loader';


const EditPaymentScreen = (props) => {
    let item = props.route.params.cardData
    const [loading,setLoading] = useState(false)
    const token = useSelector(state => state.userReducer.token)
    const Type = (type) => {
        let t = type.toLowerCase();
        switch (t) {
            case "visa":
                return require("../../assets/visa.png")
            case "mastercard":
                return require("../../assets/master.png")
            case "american-express":
                return require("../../assets/american.png")
            case "discover":
                return require("../../assets/discover.png")
            case "jcb":
                return require("../../assets/jcb.png")
            case "unionpay":
                return require("../../assets/unionpay.png")
            case "diners_club":
                return require("../../assets/dinner_club.png")
            case "mir":
                return require("../../assets/mir.png")
            case "elo":
                return require("../../assets/elo.png")
            case "hiper":
                return require("../../assets/hiper.png")
            case "hipercards":
                return require("../../assets/hipercard.png")
            case "maestro":
                return require("../../assets/maestro.png")
            default:
                return require("../../assets/invalid.png")
        }
    }
    return (
        <View style={{width: '100%', height: '100%',backgroundColor: 'white'}}>
        <SafeAreaView>
            <TopHeaderView title="Edit Payments" />
            <View>
                <View style={styles.itemViewStyle}>
                    <Image style={{ resizeMode: "contain", width: 16, height: 16, marginHorizontal: 4 }} source={require("../../assets/backBtn.png")}></Image>
                    <Image style={{ resizeMode: "stretch", width: 44, height: 44 }} source={Type(item.brand)}></Image>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginLeft: 16 }}>{item.brand + " " + item.last4}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style={styles.ratingViewStyle} onPress={() => {
                         store.dispatch(SetDefaultCardID(item.id));
                         Toast.show('Card is added as default')
                    }} >
                        <Text style={styles.btnTitleStyle}>Default</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.ratingViewStyle,{backgroundColor:'red'}]} onPress={() => {
                         setLoading(true);
                         deleteCard(token, item.id).then(response => {
                            if (response.ok) {
                                if (response.data?.status === true) {
                                    setLoading(false);
                                    Toast.show(response.data.message)
                                    setTimeout(() => {
                                        props.navigation.pop()
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
                        });
                    }} >
                        <Text style={styles.btnTitleStyle}>Delete</Text>
                    </TouchableOpacity>

                </View>
            </View>
            {loading && <Loader/>}
        </SafeAreaView>
        </View>
    )
}

export default EditPaymentScreen

const styles = StyleSheet.create({
    titleStyle: {
        margin: 20,
        fontFamily: Custom_Fonts.Montserrat_SemiBold,
        fontSize: 18
    },
    itemViewStyle: {
        width: "90%",
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 16,
        height: 55,
        marginTop: 60,
        marginHorizontal: 16,
        shadowColor: "grey",
        shadowOpacity: 0.4,
        elevation: 6,
        shadowOffset: { width: 0, height: 1 }
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    ratingViewStyle: {
        width: "25%",
        height: 30,
        backgroundColor: Colors.themeBlue,
        borderRadius: 8,
        marginHorizontal: 4,
        justifyContent: "center",
        alignSelf: "center", marginTop: 20
    },

});