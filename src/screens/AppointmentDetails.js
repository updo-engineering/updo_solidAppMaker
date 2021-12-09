import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image, FlatList,TextInput,ScrollView } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import moment from 'moment';
import { useSelector } from "react-redux"
import { getAppointmentDetail } from "../apiSauce/HttpInteractor";
import { Colors } from "../Colors/Colors";

import { Constants } from "../Constants/Constants";
const AppointmentDetails = (props) => {

  const appointmentID = props.route.params.appointmentID
  const user = useSelector(state => state.userReducer.user)
  const [loading, setLoading] = useState(false)
  const [appointmentData, setAppointmentData] = useState(props.route.params.appointmentData);
  const titleStr = props.route.params.titleStr ?? 'TipTop'

  const AdditionalItem = ({ item, index }) => {
    return (
      <View >
        <FlatList
          style={{ marginBottom: 8 }}
          horizontal={false}
          data={item.sub_services}
          renderItem={(itemData) => {
            return (SubServiceItem(itemData.item, itemData.index, index))
          }}
          scrollEnabled={false}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }

  useEffect(() => {
    if (appointmentData == undefined) {
      setLoading(true);
      getAppointmentDetail(appointmentID).then(response => {
        if (response.ok) {
          setLoading(false);
          if (response.data?.status === true) {
            setAppointmentData(response.data?.data)
          }
          else {
            setLoading(false);
            props.navigation.goBack()
            Toast.show(response.data.message)
          }
        } else {
          setLoading(false);
          props.navigation.goBack()
          Toast.show(response.problem)
        }
      });
    }
  }, [])


  const SubServiceItem = (item) => {
    return (
      <View
        style={{
          flexDirection: "row", paddingHorizontal: 16, marginVertical: 16
        }}>
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14, width: '80%' }}>{item.service_name}</Text>

        <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 14 }}>$ {item.service_total}</Text>
      </View>
    );
  }

  const otherItems = (item) => {
    return (
      <View
        style={{
          flexDirection: "row", paddingHorizontal: 16, marginVertical: 16
        }}>
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 14, width: '80%' }}>{item.item.charge_name}</Text>

        <Text style={{ marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 14 }}>$ {item.item.charge_amount}</Text>
      </View>
    );
  }


  return (
    <ScrollView
    style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
    horizontal={false}
    scrollEventThrottle={16}
    bounces={false}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}>
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
            }} source={require("../assets/backBtn.png")} />
          </TouchableOpacity>

          <Text style={{ marginTop: 16, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18, alignSelf: 'center' }}>{titleStr}</Text>

        </View>

        {appointmentData?.is_proposed == 0 ? <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'red', fontSize: 18, alignSelf: "center", marginTop: 40 }}>No proposal sent till now</Text> : <View style={{
          margin: 8, backgroundColor: 'white', borderRadius: 16, elevation: 4,
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 1 }, shadowColor: "grey", padding: 8
        }}>
          <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
            <Image style={{ width: 64, height: 64, resizeMode: "cover", borderRadius: 32 }} source={appointmentData?.customer_id?.profile_pic == '' ? require("../assets/dummy.png") : { uri: (appointmentData?.customer_id?.profile_pic ?? '').includes('https://') ? appointmentData?.customer_id?.profile_pic : Constants.IMG_BASE_URL + appointmentData?.customer_id?.profile_pic }}></Image>
         
        
              <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 16,alignSelf: "center",marginLeft:12}}>{appointmentData?.customer_id?.name}</Text>
          

          </View>
           <View style={{ flexDirection: "row", paddingHorizontal:16,marginTop:16}}>
           <Text style={{ color: 'black', fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 13 }}>Date: </Text>
          <Text style={{ color: 'black', fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 13 }}>{moment.unix(appointmentData?.appoint_start).format('dddd, MMMM DD') + " at " + moment.unix(appointmentData?.appoint_start).format('h:mm a')}</Text>
          </View>

          <View style={{ flexDirection: "row", paddingHorizontal:16,marginVertical:8}}>
           <Text style={{ color: 'black', fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 13 }}>Location: </Text>
          <Text style={{ color: 'black', fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 13 }}></Text>
          </View>
          <View style = {{height:1,width:'100%',backgroundColor:'black',opacity: 0.1,marginBottom:20}}/>
          <FlatList
            horizontal={false}
            data={appointmentData?.proposal_id?.services_data}
            renderItem={AdditionalItem}
            keyExtractor={item => item.id}
          />

          <FlatList
            horizontal={false}
            data={appointmentData?.proposal_id?.additional_charges}
            renderItem={otherItems}
            keyExtractor={item => item.id}
          />
          <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', marginTop: 25, opacity: 0.4 }} />
          <View style={{ justifyContent: "center", alignSelf: "center", padding: 16, flexDirection: "row" }}>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'black', fontSize: 16, alignSelf: "center" }}>Total</Text>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'black', marginLeft: 30, fontSize: 20, alignSelf: "center" }}>$ {appointmentData?.proposal_id?.total}</Text>

          </View>
          <View style={{ height: 1, width: '85%', alignSelf: "center", backgroundColor: 'grey', opacity: 0.4 }} />

          {titleStr == 'Upcoming Tiptop' && user.user_type == 'Customer' ? 
          <TouchableOpacity style={{
            width: "60%",
            flexDirection: "row",
            height: 50,
            backgroundColor: Colors.themeBlue,
            marginHorizontal: 25,
            marginTop: 40,
            marginBottom: 16,
            borderRadius: 25,
            alignSelf: 'center',
            justifyContent: "center",
            elevation: 3,
            shadowColor: "grey",
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 1 }
        }} onPress={() => {
          props.navigation.navigate('MessageScreen', { key: user._id + '_' + appointmentData?.provider_id?._id, chatHeader: appointmentData?.provider_id?.name, toID: appointmentData?.provider_id?._id })
        }} >
            <Text style={{
                alignSelf: "center",
                color: "white",
                fontSize: 16,
                fontFamily: Custom_Fonts.Montserrat_Medium
            }}>Request a Change</Text>
        </TouchableOpacity>
          : <View >
                           <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 60, marginLeft: 16, color: 'black', fontSize: 14 }}>My Notes</Text>
                    <TextInput style={{ height: 90, borderRadius: 12, borderWidth: 1, borderColor: Colors.themeBlue, margin: 16, padding: 12, color: 'black' }} value={appointmentData?.note}
                    editable = {false} multiline={true} placeholder='No note available' />
            </View>}
          {appointmentData?.payment_status != 1 && appointmentData?.status == 3 ? <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: 'red', fontSize: 18, alignSelf: "center", marginTop: 20 }}>Payment Pending</Text> : null}

        </View>}


      </SafeAreaView>
    </ScrollView>
  );
}

export default AppointmentDetails


