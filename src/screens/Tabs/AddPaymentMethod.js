import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../TopHeader/TopHeaderView"
const { width, height } = Dimensions.get('window');
import TextInputMask from 'react-native-text-input-mask';
import Toast from 'react-native-simple-toast';
import { addCard } from "../../apiSauce/HttpInteractor";
import { useSelector } from "react-redux"
var creditCardType = require("credit-card-type");
import CountryPicker from 'react-native-country-picker-modal'
import { Colors } from "../../Colors/Colors";
import Loader from '../../Components/loader';
import store from "../../Redux/store"

const AddPaymentMethod = ({ navigation }) => {
    const token = useSelector(state => state.userReducer.token)
    const user = useSelector(state => state.userReducer.user)
    const [cardNo, setCardNumber] = useState("")
    const [visi, setVisible] = useState(false)
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [isDefault, setIsDefault] = useState(false)
    const [country, setCountry] = useState({name:"US",cca2:"US"})
    var cards = creditCardType(cardNo)
    const [loading,setLoading] = useState(false)

    const STRIPE_PUBLISHABLE_KEY = 'sk_test_51Ia3rTJ8HbqT3LtFSqxkwOL4IVG8zUKdoxXgnwZvYDAwLcKCiqxIcuylwx56N7YBygLzeRV7zcGCVeVi303KR5bs000PcgHdsc';

    const Type = () => {
        if (cards && cards[0]) {
            switch (cards[0].type) {
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
        else {
            return require("../../assets/invalid.png")
        }
    }

    const getCreditCardToken = async () => {
        //setLoader(true)
        if (cardNo.length === 0 || expiry.length === 0 || cvv.length === 0) {
            setLoading(false);
            Toast.show("All fields are required")
            //setLoader(false)
            return false
        }
        return new Promise((resolve, reject) => {
            const card = `card[number]=${cardNo.replace(/ /g, '')}&card[exp_month]=${expiry.split('/')[0]}&card[exp_year]=${expiry.split('/')[1]}&card[cvc]=${cvv}&card[name]=${user.name}`
            fetch('https://api.stripe.com/v1/tokens', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
                },
                method: 'post',
                body: card,
            }).then(response => response.json())
                .then(result => {
                    if (result.id) {
                        resolve(result)
                        on_press_register_designer(result.id)
                    } else {
                        setLoading(false);
                        reject(result)
                        Toast.show(result.error.message)
                        //setLoader(false)
                    }
                })
                .catch(error => {
                    setLoading(false);
                    console.log('error', error)
                    reject(error)
                })

        })
    }

    function on_press_register_designer(id) {
        addCard(token, id).then(response => {
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
        });
    }

    return (
        <View style={{ backgroundColor: "white", height }}>
            <SafeAreaView>
                <TopHeaderView title="Add payment method" />
                <View style={{ paddingHorizontal: 16 }}>
                    <View style={styles.pickerStyle}>
                        <Image style={{ resizeMode: "cover", width: 45, height: 32, marginLeft: 12 }} source={Type()}></Image>
                        <TextInputMask style={styles.pickerTitleStyle}
                            onChangeText={(formatted, extracted) => {
                                setCardNumber(formatted)
                            }}
                            mask={"[0000] [0000] [0000] [0000]"}
                            value={cardNo}
                            keyboardType="numeric"
                            placeholderTextColor='grey'
                            color='black'
                            fontSize={15}
                            fontFamily={Custom_Fonts.Montserrat_Medium}
                            placeholder="Enter Card Number" />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={[styles.pickerStyle, { width: "48%" }]}>
                            <TextInputMask style={styles.pickerTitleStyle} onChangeText={(formatted, extracted) => {
                                setExpiry(formatted)
                            }}
                                mask={"[00]/[00]"}
                                value={expiry}
                                placeholder="MM/YY"
                                placeholderTextColor='grey'
                                keyboardType="numeric"
                                color='black'
                                fontSize={15}
                                fontFamily={Custom_Fonts.Montserrat_Medium}
                            />
                        </View>

                        <View style={[styles.pickerStyle, { width: "48%" }]}>
                            <TextInputMask style={styles.pickerTitleStyle} onChangeText={(formatted, extracted) => {
                                setCvv(formatted)
                            }}
                                mask={"[000]"}
                                value={cvv}
                                placeholder="CVV"
                                placeholderTextColor='grey'
                                keyboardType="numeric"
                                color='black'
                                fontSize={15}
                                fontFamily={Custom_Fonts.Montserrat_Medium}
                                secureTextEntry
                            />
                        </View>
                    </View>
                   

                    <TouchableOpacity style={styles.pickerStyle} onPress={() =>{
                        setVisible(true)
                    }}>
                        <Text style={[styles.pickerTitleStyle, { width: "75%" }]} >{country.name}</Text>
                        <CountryPicker {...{visible: visi,withCountryNameButton:false,countryCode:country.cca2,withflag:true,withEmoji:true,placeholder:"",withFilter:true,onSelect:(country) => setCountry(country),onClose: () => setVisible(false),
                     onOpen: () => setVisible(true)}} 
                     />
                        <Image style={{ resizeMode: "contain", width: 20, height: 20, position:"absolute",end:16 }} source={require("../../assets/down.png")}></Image>

                    </TouchableOpacity>
                    <View style={styles.pickerStyle}>
                        <TextInput style={styles.pickerTitleStyle} placeholder="ZIP Code" keyboardType="number-pad"></TextInput>
                    </View>

                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }} onPress={() =>{
                        setIsDefault(!isDefault)
                    }}>
                        <Image style={{ resizeMode: "stretch", width: 24, height: 24, marginLeft: 4 }} source={isDefault ? require("../../assets/checked.png"):require("../../assets/checkBox.png")}></Image>
                        <Text style={[styles.pickerTitleStyle,{fontFamily:Custom_Fonts.Montserrat_SemiBold,marginLeft:12,marginTop:2}]} >Set this as default payment method</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                    width: "95%",
                    flexDirection: "row",
                    height: 50,
                    backgroundColor: Colors.themeBlue,
                    marginHorizontal: 25,
                    marginTop: 40,
                    marginBottom: 60,
                    borderRadius: 25,
                    alignSelf:"center",
                    justifyContent: "center"
                }} onPress={() => {
                    setLoading(true);
                    getCreditCardToken()
                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 17,
                        fontFamily: Custom_Fonts.Montserrat_SemiBold
                    }}>Save</Text>
                </TouchableOpacity>

                </View>
            </SafeAreaView>
            {loading && <Loader/>}
        </View>
        
    )
}

export default AddPaymentMethod

const styles = StyleSheet.create({
    pickerStyle: {
        flexDirection: "row",
        height: 50,
        marginVertical: 8,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center"
    },
    pickerTitleStyle: {
        color: "black",
        fontSize: 15,
        fontFamily: Custom_Fonts.Montserrat_Regular,
        marginLeft: 16,
        width: "90%"
    },

});