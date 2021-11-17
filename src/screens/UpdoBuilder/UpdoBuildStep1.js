
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, TextInput, Image, FlatList, ScrollView } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import TopHeaderView from "../TopHeader/TopHeaderView";
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-simple-toast';
import Loader from '../../Components/loader';
import { getProviderDetail } from "../../apiSauce/HttpInteractor";
import _ from 'lodash'
import { setAppointmentData } from "../../Redux/userDetail";
import { Constants } from "../../Constants/Constants";
const UpdoBuildStep1 = (props) => {
    let appointmentData = useSelector(state => state.userReducer).appointmentData
    const [loading, setLoading] = useState(false)
    const [serviceData, setServiceData] = useState([]);
    let a = []
    const [selectedIndex, setIndex] = useState(0)
    const [descrip, setDescrip] = useState(appointmentData?.description ?? "")
    const token = useSelector(state => state.userReducer.token)
    let dispatch = useDispatch()

    useEffect(() => {
        setLoading(true);
        getProviderDetail(token).then(response => {
            if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                    for (let index = 0; index < appointmentData.services_data.length; index++) {
                        const subservices = appointmentData.services_data[index].sub_services;
                        for (let index = 0; index < subservices.length; index++) {
                            const element = subservices[index].service_name;
                            a.push(element)
                        }
                    }
                    let dataC=_.cloneDeep(response.data.data.services)
                    for (let index = 0; index < dataC.length; index++) {
                        const subservices = dataC[index].sub_services;
                        for (let index = 0; index < subservices.length; index++) {
                            const element = subservices[index].service_name;
                            if (a.includes(element)) {
                                subservices[index]._id ='selected';
                            }
                        }
                    }
                    setServiceData(dataC)
                }
                else {
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                Toast.show(response.problem)
            }
        });
    }, []);


    const Item = ({ item, index }) => (
        <View >
            <TouchableOpacity style={{ justifyContent: "space-between", flexDirection: 'row', padding: 16 }} onPress={() => { setIndex(index) }}>
                <Text style={{fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'black', fontSize: 14, width: '80%' }}>{item.service_id.service_name}</Text>
                <Image style={{ width: 20, height: 20, alignSelf: "center", marginEnd: 16, resizeMode: "contain", tintColor: 'black' }} source={selectedIndex === index ? require("../../assets/upArrow.png") : require("../../assets/downWhite.png")} />
            </TouchableOpacity>
            {selectedIndex === index ?
                <FlatList
                    style={{ marginBottom: 8 }}
                    horizontal={false}
                    data={item.sub_services}
                    renderItem={SubItem}
                    scrollEnabled={false}
                    keyExtractor={item => item.id}
                /> : null}
        </View>
    );

    const SubItem = ({ item, index }) => (
        <View>
            <View style={{ height: 90, borderRadius: 16, borderWidth: 1, borderColor: Colors.themeBlue, marginHorizontal: 12, marginVertical: 4, paddingHorizontal: 12,backgroundColor: item._id == 'selected' ? Colors.themeBlue : null }}>
                <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold, color: item._id == 'selected' ? 'white' : 'black', fontSize: 14, marginTop: 16, width: '80%' }}>{item.service_name}</Text>
                <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold, color: item._id == 'selected' ? 'white' : 'black', fontSize: 14, marginTop: 16, width: '80%' }}>from $ {item.service_price}</Text>
                <TouchableOpacity style={{ position: "absolute", end: 20, top: 34 }} onPress={() => { 
                     let dataC=_.cloneDeep(serviceData)
                     if  (dataC[selectedIndex].sub_services[index]._id == 'selected'){
                        dataC[selectedIndex].sub_services[index]._id=''
                     }
                     else{
                        dataC[selectedIndex].sub_services[index]._id='selected'
                     }
                     setServiceData(dataC)
                }} >
                    <Image style={{ width: 26, height: 26, resizeMode: "cover",tintColor: item._id == 'selected' ? 'white' : null}} source={item._id == 'selected' ?  require("../../assets/close1.png") : require("../../assets/addBtnBlue.png")} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={{height:'100%',backgroundColor:'white'}}>
        <ScrollView
            style={{ width: "100%", height: "100%" }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title={'Updo with '+appointmentData.customerName} />
                <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
                    <Image style={{ width: 64, height: 64, resizeMode: "cover", borderRadius: 32 }} source={appointmentData.customerImg == '' ? require("../../assets/dummy.png") : {uri:Constants.IMG_BASE_URL+appointmentData.customerImg}}></Image>
                    <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: '#F0B752', alignSelf: "center", width: '80%', marginLeft: 8 }]} onPress={() => {
                         props.navigation.navigate('SetAppointmentTime')
                    }} >
                        <Image style={{ width: 20, height: 20, resizeMode: "contain", tintColor: 'white', alignSelf: "center" }} source={require("../../assets/calendarIcon.png")}></Image>
                        <Text style={[styles.btnTitleStyle, { color: "white", fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Set Appointment Time</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold, margin: 16, color: '#4D4D4D', fontSize: 13 }}>Service Description</Text>
                <TextInput style={{ borderRadius: 20, height: 40, borderWidth: 1, borderColor: 'black', marginHorizontal: 16, paddingHorizontal: 16,color:'black' }} placeholder='45 Minute Haircut for Jane Doe' onChangeText={(t) => {
                            setDescrip(t)
                        }} />
                <Text style={{ color: "black", fontFamily: Custom_Fonts.Montserrat_SemiBold, margin: 16, color: 'black', fontSize: 14, marginTop: 16 }}>Select from My Services</Text>

                <FlatList
                    style={{
                        margin: 8, backgroundColor: 'white', borderRadius: 16, elevation: 4, shadowColor: "grey",
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
                    }}
                    horizontal={false}
                    data={serviceData}
                    renderItem={Item}
                    keyExtractor={item => item.id}
                />
                <TouchableOpacity style={[styles.btnViewStyle,{backgroundColor:Colors.themeBlue,width: '90%',alignSelf: "center",marginTop:40, height: 48, borderRadius: 24}]} onPress={() => {
                    const serviceD =serviceData.map(x=>(
                        {service_id:x._id,
                        sub_services:x.sub_services.filter(x=>x._id == 'selected').map(xi=>({...xi,service_qty:xi.quantity??1,service_total:Number(xi.service_price)*(xi.quantity??1)}))})).filter(x=>x.sub_services.length>0)
                        if (serviceD.length === 0){
                            Toast.show('Please choose atleast 1 service')
                        }
                        else if (appointmentData.start_time == null) {
                            Toast.show('Please set appointment time')
                        }
                        else{
                        appointmentData = {
                            ...appointmentData,
                            services_data:serviceD,
                            description:descrip
                          }
                          dispatch(setAppointmentData(appointmentData))
                          props.navigation.navigate('UpdoBuildStep2')}
                }} >
                    <Text style={[styles.btnTitleStyle,{fontFamily: Custom_Fonts.Montserrat_SemiBold, color: 'white', fontSize: 14}]}>Continue</Text>
                </TouchableOpacity>
                {loading && <Loader />}
            </SafeAreaView>
        </ScrollView>
        </View>
    );
}

export default UpdoBuildStep1

const styles = StyleSheet.create({
    btnViewStyle: {
        height: 40,
        marginVertical: 12,
        marginHorizontal: 4,
        borderRadius: 20,
        justifyContent: "center", elevation: 3, flexDirection: "row"
    }
    ,
    btnTitleStyle: {
        alignSelf: "center",
        marginHorizontal: 12,
        fontSize: 14
    },
});
