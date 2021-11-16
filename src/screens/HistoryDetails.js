import React, { useState } from "react";
import { Text, Image, View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeaderView from "../screens/TopHeader/TopHeaderView"
const { width, height } = Dimensions.get('window');
import moment from 'moment'

const HistoryDetails = (props) => {
    let data = props.route.params.transData
    let payData = JSON.parse(data?.payment_data)

    return (

        <View style={{ backgroundColor: "white", height }}>
            <SafeAreaView>
                <TopHeaderView title="History details" />

                <View style={{
                    height: 280, backgroundColor: 'white', elevation: 3, shadowColor: "grey", marginHorizontal: 16, marginVertical: 8, borderRadius: 12,
                    shadowOpacity: 0.4,
                    shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width:'60%' }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: '#8E8E8E', marginHorizontal: 25, marginTop: 25 }}>Payment method</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginHorizontal: 25, marginTop: 8 }}>{(payData.charges?.data[0]?.payment_method_details?.card?.brand).toUpperCase() + " " + payData.charges?.data[0]?.payment_method_details?.card?.last4}</Text>
                        </View>

                        <View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: '#8E8E8E', marginHorizontal: 25, marginTop: 25 }}>Date</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginHorizontal: 25, marginTop: 8 }}>{moment.unix(data?.appoint_start).format('MMM DD, yyyy')}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                    <View style={{ width:'60%' }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: '#8E8E8E', marginHorizontal: 25, marginTop: 25 }}>Updo ID</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginHorizontal: 25, marginTop: 8 }}>{data?.proposal_id._id.slice(0, 6).toUpperCase()}</Text>
                        </View>

                        <View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: '#8E8E8E', marginHorizontal: 25, marginTop: 25 }}>Total</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginHorizontal: 25, marginTop: 8 }}>$ {data.proposal_id.total}</Text>
                        </View>
                    </View>

                    <View style={{ height:0.5 ,backgroundColor:'#8E8E8E',marginTop:30}}/>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 17, color: 'black', marginHorizontal: 25, marginTop: 20 }}>{data?.proposal_id?.services_data[0]?.sub_services[0]?.service_name}</Text>
                    <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: '#8E8E8E', marginLeft: 25, marginTop: 4 }}>for</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16, color: 'black', marginLeft: 8,marginTop: 4 }}>{data.customer_id.name}</Text>

                   </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default HistoryDetails




