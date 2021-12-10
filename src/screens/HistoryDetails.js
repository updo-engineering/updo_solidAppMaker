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
                <TopHeaderView title="Details" />

                <View style={{
                    backgroundColor: 'white', elevation: 6, shadowColor: "black", marginHorizontal: 16, marginVertical: 8, borderRadius: 12,
                    shadowOpacity: 0.6,
                    shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
                }}>


                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 17, color: 'black', marginHorizontal: 25, marginTop: 20 }}>{data?.proposal_id?.services_data[0]?.sub_services[0]?.service_name}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 14, color: '#8E8E8E', marginLeft: 25, marginTop: 4 }}>for</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, color: 'black', marginLeft: 8, marginTop: 4 }}>{data.customer_id.name}</Text>

                    </View>
                    <View style={{ height: 0.5, backgroundColor: '#8E8E8E', marginTop: 30 }} />


                    <View style={{ flexDirection: "row", marginVertical: 40,justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, color: 'black', marginHorizontal: 25,alignSelf: "center",opacity:0.5 }}>Total</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 14, color: 'black', marginHorizontal: 25, marginTop: 8,alignSelf: "center" }}>$ {data.proposal_id.total}</Text>
                        </View>

                        <View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, color: 'black', marginHorizontal: 25, alignSelf: "center",opacity:0.5 }}>Tiptop ID</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 14, color: 'black', marginHorizontal: 25, marginTop: 8,alignSelf: "center" }}>{data?.proposal_id?._id.slice(0, 6).toUpperCase()}</Text>
                        </View>

                        <View>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, color: 'black', marginHorizontal: 25, alignSelf: "center",opacity:0.5}}>Date</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 14, color: 'black', marginHorizontal: 25, marginTop: 8,alignSelf: "center" }}>{moment.unix(data?.appoint_start).format('MMM DD, yyyy')}</Text>
                        </View>
                    </View>


                </View>
            </SafeAreaView>
        </View>
    )
}

export default HistoryDetails




