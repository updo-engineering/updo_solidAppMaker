import React, { useState } from "react";
import { Text, Image, View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../screens/TopHeader/TopHeaderView"
const { width, height } = Dimensions.get('window');
import { useSelector } from "react-redux"
import { getTransactionList } from "../apiSauce/HttpInteractor";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Loader from '../Components/loader';
import moment from 'moment'

const TransactionList = ({ navigation }) => {


    const Type = (type) => {
        let t = type.toLowerCase();
        switch (t) {
            case "visa":
                return require("../assets/visa.png")
            case "mastercard":
                return require("../assets/master.png")
            case "american-express":
                return require("../assets/american.png")
            case "discover":
                return require("../assets/discover.png")
            case "jcb":
                return require("../assets/jcb.png")
            case "unionpay":
                return require("../assets/unionpay.png")
            case "diners_club":
                return require("../assets/dinner_club.png")
            case "mir":
                return require("../assets/mir.png")
            case "elo":
                return require("../assets/elo.png")
            case "hiper":
                return require("../assets/hiper.png")
            case "hipercards":
                return require("../assets/hipercard.png")
            case "maestro":
                return require("../assets/maestro.png")
            default:
                return require("../assets/invalid.png")
        }
    }

    const [loading, setLoading] = useState(false)
    const [trans, setTrans] = useState([])
    const token = useSelector(state => state.userReducer.token)

    const getTrans = () => {
        setLoading(true);
        getTransactionList(token).then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    setLoading(false);
                    setTrans(response.data.data)
                }
                else {
                    setLoading(false);
                    setTrans([])
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                setTrans([])
                Toast.show(response.problem)
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            getTrans()
            return () => {
                //unfocused
            };
        }, [])
    );


    const Item = ({ item }) => {
        let payData = JSON.parse(item?.payment_data)
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('HistoryDetails',{transData:item})
                
            }} style={{
                height: 70, backgroundColor: 'white', elevation: 3, shadowColor: "grey", marginHorizontal: 16, marginVertical: 8, borderRadius: 12,
                shadowOpacity: 0.4,
                shadowOffset: { width: 0, height: 1 }, shadowColor: "grey", flexDirection: "row"
            }}>
                <Image style={{ width: 40, height: 40, alignSelf: "center", marginLeft: 15 }} source={Type(payData.charges?.data[0]?.payment_method_details?.card?.brand)} />
                <View style={{ alignSelf: "center", marginLeft: 12 }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15 }}>{moment.unix(item?.appoint_start).format('MMM DD, yyyy')}</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 13, color: '#8E8E8E' }}>{payData.charges?.data[0]?.payment_method_details?.card?.last4}</Text>

                </View>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, color: 'black', position: "absolute", end: 40,top:22 }}>$ {item.proposal_id.total}</Text>
                <Image style={{ resizeMode: "contain", width: 15, height: 15, marginHorizontal: 12, marginVertical: 14, position: "absolute", end: 0,top:12 }} source={require("../assets/rightArrow.png")}></Image>

            </TouchableOpacity>
        );
    }

    return (

        <View style={{ backgroundColor: "white", height }}>
            <SafeAreaView>
                <TopHeaderView title="Transaction history" />

                <FlatList
                    style={{ marginBottom: 100, marginTop: 20 }}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    data={trans}
                    renderItem={Item}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            {loading && <Loader />}
        </View>
    )
}

export default TransactionList




