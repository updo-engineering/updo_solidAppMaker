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
                height: 70, backgroundColor: 'white', elevation: 8, shadowColor: "grey", marginHorizontal: 16, marginVertical: 8, borderRadius: 12,
                shadowOpacity: 0.6,
                shadowOffset: { width: 0, height: 1 }, shadowColor: "black", flexDirection: "row"
            }}>
                <View style={{ alignSelf: "center", marginLeft: 12 }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15 }}>{moment.unix(item?.appoint_start).format('MMM DD, yyyy')}</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 13, color: '#8E8E8E' }}>{item.customer_id.name}</Text>

                </View>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, color: 'black', position: "absolute", end: 40,top:22 }}>$ {item.proposal_id.total}</Text>
                <Image style={{ resizeMode: "contain", width: 15, height: 15, marginHorizontal: 12, marginVertical: 14, position: "absolute", end: 0,top:12 }} source={require("../assets/rightArrow.png")}></Image>

            </TouchableOpacity>
        );
    }

    return (

        <View style={{ backgroundColor: "white", height }}>
            <SafeAreaView>
                <TopHeaderView title="Earning History" />

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




