import React, { useState } from "react";
import { Text, Image, View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../TopHeader/TopHeaderView"
import { useSelector } from "react-redux"
import { getSavedCards } from "../../apiSauce/HttpInteractor";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Loader from '../../Components/loader';

const PaymentsScreen = ({ navigation }) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.userReducer.token)
    const user = useSelector(state => state.userReducer.user)
    const defaultCardID = useSelector(state => state.userReducer.defaultCardID)
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

    const getCards = () => {
        setLoading(true);
        getSavedCards(token).then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    setLoading(false);
                    setCards(response.data.data.data)
                }
                else {
                    setLoading(false);
                    setCards([])
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                setCards([])
                Toast.show(response.problem)
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            if (user.user_type === 'Customer') {
               // getCards()
            }
            return () => {
                //unfocused
            };
        }, [])
    );


    const Item = ({ item }) => (
        <TouchableOpacity style={styles.itemViewStyle} onPress={() => {
            navigation.navigate('EditPaymentScreen', { cardData: item })
        }} >
            <Image style={{ resizeMode: "stretch", width: 44, height: 44, marginHorizontal: 12 }} source={Type(item.brand)}></Image>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15 }}>{item.brand + " " + item.last4}</Text>
            {item.id == defaultCardID ?
                <View style={styles.ratingViewStyle} onPress={() => {
                    //     navigation.navigate('HomeTabScreen')
                }} >
                    <Text style={styles.btnTitleStyle}>Default</Text>
                </View>
                : <View />
            }
            <Image style={{ resizeMode: "contain", width: 16, height: 16, marginHorizontal: 12, marginVertical: 14, position: "absolute", end: 0 }} source={require("../../assets/rightArrow.png")}></Image>

        </TouchableOpacity>
    );

    return (

        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Payments" />
                <View>
                    <Text style={styles.titleStyle}>Payment Methods</Text>
                    <FlatList
                        horizontal={false}
                        scrollEnabled = {false}
                        showsHorizontalScrollIndicator={false}
                        data={cards}
                        renderItem={Item}
                        keyExtractor={item => item.id}
                    />
                    <TouchableOpacity style={styles.itemViewStyle} onPress={() => {
                        navigation.navigate('AddPaymentMethod')
                    }} >
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, marginLeft: 16 }}>Add payment method</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 24, color: "black", position: "absolute", end: 16 }}>+</Text>
                    </TouchableOpacity>

                    <View style={{
                        marginHorizontal: 16, marginVertical: 12, borderRadius: 12, backgroundColor: 'white', elevation: 6, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.4,
                        shadowColor: "black"
                    }}>
                        <Image source={require('../../assets/stripe.png')} style={{ width: '100%', height: 120, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginHorizontal: 20, marginBottom: 20 }}>TipTop is proud to partner with
                        <Text style={{fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, color:'#2c02a1' }}> Stripe </Text> 
                         to create a safe and secure payment engine for our community!{'\n\n'}Trusted by millions,
                         <Text style={{fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, color:'#2c02a1' }}> Stripe </Text>  
                          is the payment infrastrucure for the internet.</Text>

                    </View>


                </View>

            </SafeAreaView>
            {loading && <Loader />}
        </ScrollView>
    )
}

export default PaymentsScreen




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
        marginVertical: 12,
        marginHorizontal: 16,
        shadowColor: "black",
        shadowOpacity: 0.4,
        elevation: 3,
        shadowOffset: { width: 0, height: 1 }
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 12,
        marginHorizontal: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    ratingViewStyle: {
        height: 30,
        backgroundColor: Colors.themeBlue,
        borderRadius: 8,
        justifyContent: "center",
        alignSelf: "center",
        position: "absolute",
        end: 40
    },

});