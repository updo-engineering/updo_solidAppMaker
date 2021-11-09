import React, { useState } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, FlatList } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import moment from 'moment';
import { useSelector } from "react-redux"

import { Constants } from "../../Constants/Constants";
const CalendarAppointmentDetail = (props) => {

  const appointmentData = props.route.params.appointmentData
  const user = useSelector(state => state.userReducer.user)

  const AdditionalItem = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row", paddingHorizontal: 8, marginVertical: 8, alignItems: 'center'
          }}>
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14 }}>{item.charge_name}</Text>
          <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14, position: 'absolute', end: 16 }}>$ {item.charge_amount}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <SafeAreaView>
        <View style={{ flexDirection: "row", marginBottom: 25 }}>
          <TouchableOpacity onPress={() => {
            props.navigation.goBack();
          }} >
            <Image style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
              marginHorizontal: 16, marginTop: 20
            }} source={require("../../assets/backBtn.png")} />
          </TouchableOpacity>
          <Text style={{ marginTop: 16, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: 'center' }}>{moment.unix(appointmentData?.start_time).format('h:mm a')}</Text>
          <Text style={{ marginTop: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, alignSelf: 'center' }}> with </Text>
          <Text style={{ marginTop: 16, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: 'center' }}>{appointmentData?.appointment_data?.customer_id?.name}</Text>
          <TouchableOpacity style={{ marginHorizontal: 16, marginTop: 20, position: "absolute", end: 16}}onPress={() => {
            props.navigation.navigate('MessageScreen', { key: appointmentData?.appointment_data?.customer_id?._id + '_' + user._id, chatHeader: appointmentData?.appointment_data?.customer_id?.name, toID: appointmentData?.appointment_data?.customer_id?._id })

          }} >
            <Image style={{ width: 24, height: 24,  resizeMode: "contain" }} source={require("../../assets/msg.png")} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
          <Image style={{ width: 64, height: 64, resizeMode: "cover", borderRadius: 32 }} source={appointmentData?.appointment_data?.customer_id?.profile_pic == '' ? require("../../assets/dummy.png") : { uri: Constants.IMG_BASE_URL + appointmentData?.appointment_data.customer_id?.profile_pic }}></Image>
          <View style={{ padding: 8 }}>
            <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15 }}>{appointmentData?.appointment_data?.customer_id?.name}</Text>
            <Text style={{ color: '#4D4D4D', fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 13 }}>{moment.unix(appointmentData?.start_time).format('dddd, MMMM DD') + " at " + moment.unix(appointmentData?.start_time).format('h:mm a')}</Text>
          </View>
        </View>

        <View style={{
          margin: 8, backgroundColor: 'white', borderRadius: 16, elevation: 4, shadowColor: "grey",
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 1 }, shadowColor: "grey", padding: 8
        }}>

          <FlatList
            horizontal={false}
            data={appointmentData?.proposal_id?.additional_charges}
            renderItem={AdditionalItem}
            keyExtractor={item => item.id}
          />
          <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', marginTop: 25, opacity: 0.4 }} />
          <View style={{ justifyContent: "center", alignSelf: "center", padding: 16, flexDirection: "row" }}>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'black', fontSize: 16, alignSelf: "center" }}>Total</Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'black', marginLeft: 30, fontSize: 20, alignSelf: "center" }}>$ {appointmentData?.proposal_id?.total}</Text>

          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

export default CalendarAppointmentDetail


