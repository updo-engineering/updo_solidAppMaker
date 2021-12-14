import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput, Keyboard } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import { getServices, getEvents } from "../apiSauce/HttpInteractor";
import Toast from 'react-native-simple-toast';
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { setServProv } from "../Redux/userDetail";
const CreateProfileStep2 = ({ navigation, route }) => {
    let user = useSelector(state => state.userReducer).user
    const [serviceData, setServiceData] = useState([]);
    const [eventsData, setEventsData] = useState([]);
    const [id, setId] = useState(0)
    let events = _.cloneDeep(user?.events)
    const [multiselect, setmultiselect] = useState(events ?? [])
    let servprovider1 = useSelector(state => state.userReducer).serv_provide
    let dispatch = useDispatch()
    let isUpdate = route.params?.isUpdate ?? false

    useEffect(() => {
        let a = []
        if (user?.services?.length > 0) {
            for (let index = 0; index < user?.services?.length; index++) {
                const subservices = user?.services[index].sub_services;
                for (let index = 0; index < subservices.length; index++) {
                    const element = subservices[index];
                    a.push(element)
                }
            }
        }
        getServices().then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    let dataC = _.cloneDeep(response.data.data)
                    dataC = dataC.map(x => {
                        let d = _.cloneDeep(x)
                        d.sub_services = d.sub_services.map(z => {
                            z.service_price = a.find(it => it.service_name == z.service_name)?.service_price ?? 0
                            return z
                        })
                        return d
                    })
                    setServiceData(dataC)

                }
                else {
                    Toast.show(response.data.message)
                }
            } else {
                Toast.show(response.problem)
            }
        });

        getEvents().then(response => {
            if (response.ok) {
                if (response.data?.status === true) {
                    setEventsData(response.data.data)
                }
                else {
                    Toast.show(response.data.message)
                }
            } else {
                Toast.show(response.problem)
            }
        });
    }, []);


    const Item = ({ item, index }) => (
        <TouchableOpacity onPress={() => {
            setId(index)
        }} style={[styles.item, { minWidth: id === index ? 128 : 120, height: id === index ? 85 : 60, alignSelf: 'center', backgroundColor: id === index ? Colors.themeBlue : 'rgba(0,168,224,0.5)', }]}>
            <Text style={styles.title}>{item.service_name}</Text>
        </TouchableOpacity>
    );

    const SubServiceItem = ({ item, index }) => {
        return (
            <View
                style={{
                    flexDirection: "row", paddingBottom: 10, marginBottom: 10, justifyContent: 'space-between', marginHorizontal: 12
                }}>
                <View style={{
                    width: '52%',
                    alignItems: 'center', overflow: 'hidden'
                }}>
                    <TextInput
                        onChangeText={t => {
                            let dataC = _.cloneDeep(serviceData)
                            dataC[id].sub_services[index].service_name = t
                            setServiceData(dataC)
                        }}
                        style={[styles.pickerTitleStyle, { width: '100%' }]}
                        value={String(item.service_name)}
                        placeholder="" />
                     <Text style={{ marginTop:-8,marginLeft:12,opacity: 0.5,fontWeight:'bold'}} ellipsizeMode="clip" numberOfLines={1} color="#C4C4C4">
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - </Text>

                </View>

                <View style={{
                    width: '35%',
                    alignItems: 'center', overflow: 'hidden',flexDirection: "row"
                }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14 ,marginBottom:12,color:'black',opacity:0.5}}>$</Text>
                    <View>
                        <TextInput
                            onChangeText={t => {
                                let dataC = _.cloneDeep(serviceData)
                                dataC[id].sub_services[index].service_price = t
                                setServiceData(dataC)
                            }}
                            style={styles.pickerTitleStyle}
                            value={String(item.service_price)}
                            placeholder="" keyboardType="number-pad" />
                         <Text style={{ marginTop:-8,marginRight:16,opacity: 0.5,fontWeight:'bold'}}ellipsizeMode="clip" numberOfLines={1} color="#C4C4C4">
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - </Text>
                    </View>
                </View>
            </View>
        );
    }


    const EventItem = ({ item }) => {
        console.log(item)
        return (

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: "row", height: 45, borderColor: Colors.themeBlue, borderRadius: 22, borderWidth: 1, marginHorizontal: 16, marginVertical: 8, alignItems: "center", width: '90%',
                        backgroundColor: !multiselect.includes(item) ? null : Colors.themeBlue
                    }}>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, marginLeft: 16, width: '83%', color: multiselect.includes(item) ? 'white' : 'black' }}>{item}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            let arr = multiselect
                            if (!arr.includes(item)) {
                                arr.push(item)
                            }
                            else {
                                let index = multiselect.findIndex(i => i === item)
                                arr.splice(index, 1)
                            }
                            setmultiselect([...arr])
                        }} >
                        <Image style={{ width: 28, height: 28, resizeMode: "contain", end: 12, tintColor: multiselect.includes(item) ? 'white' : null }} source={!multiselect.includes(item) ? require("../assets/addBtnBlue.png") : require('../assets/close1.png')}></Image>
                    </TouchableOpacity>
                </View>

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
                <TopHeaderView title={isUpdate ? 'Edit Profile' : "Complete your profile"} />

                <Text style={{ fontSize: 20, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 16 }}>Services & Prices</Text>


                <View style={{ alignItems: 'center', height: 120, justifyContent: 'center', }}>
                    <FlatList
                        style={{ marginLeft: 8 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={serviceData}
                        renderItem={Item}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={{
                    borderRadius: 16, backgroundColor: "#F1FBFF", margin: 16, borderColor: Colors.themeBlue, elevation: 4, shadowColor: "grey",
                    shadowOpacity: 0.4,
                    shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
                }}>
                    <View style={{ marginHorizontal: 16, marginTop: 12, flexDirection: "row" }}>
                        <Text style={{ fontSize: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, textAlign: "center", width: '50%' }}>Service</Text>
                        <Text style={{ fontSize: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, textAlign: "center", width: '50%', marginLeft: 20 }}>Price</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#C4C4C4', marginHorizontal: 16, marginBottom: 20, marginTop: 8 }} />
                    <FlatList
                        key="subService"
                        horizontal={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={serviceData[id]?.sub_services}
                        renderItem={SubServiceItem}
                        keyExtractor={item => item.id}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            let dataC = _.cloneDeep(serviceData)
                            let arr = dataC[id].sub_services
                            arr.push({ service_name: "", service_price: "" })
                            dataC[id].sub_services = arr
                            setServiceData(dataC)
                            console.log(dataC)
                        }
                        }
                    >
                        <Image style={{ width: 130, height: 130, resizeMode: "contain", alignSelf: "flex-end", marginBottom: -16, marginRight: -16 }} source={require("../assets/add.png")}></Image>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 20, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 16 }}>Occasians & Groups</Text>

                <View style={{
                    borderRadius: 16, backgroundColor: "#F1FBFF", margin: 16, borderColor: Colors.themeBlue, elevation: 4, shadowColor: "grey",
                    shadowOpacity: 0.4,
                    shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
                }}>
                    <FlatList
                        key="event"
                        style={{ marginLeft: 8, marginVertical: 25 }}
                        horizontal={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={eventsData.map(i => {
                            return i.event_name
                        })}
                        renderItem={EventItem}
                        keyExtractor={item => item.id}
                    />

                </View>

                <TouchableOpacity style={{
                    width: "90%",
                    flexDirection: "row",
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: Colors.themeBlue,
                    marginHorizontal: 25,
                    marginTop: 25,
                    marginBottom: 60,
                    borderRadius: 25,
                    justifyContent: "center"
                }} onPress={() => {
                    let uniqueAry = Array.from(new Set(multiselect))
                    const d = serviceData.map(x => (
                        {
                            service_id: x._id,
                            sub_services: x.sub_services.filter(x => (Number(x.service_price) > 0) && x.service_name != '')
                        })).filter(x => x.sub_services.length > 0)
                    if (d.length < 1) {
                        Toast.show("Please select service price first")
                    }
                    else if (uniqueAry.length < 1) {
                        Toast.show("Please select some event first")
                    }
                    else {
                        let _data = {
                            services: d,
                            events: uniqueAry
                        }
                        servprovider1 = {
                            ...servprovider1,
                            serv_provide_2: _data

                        }

                        dispatch(setServProv(servprovider1))



                        navigation.navigate('CreateProfileStep3', { isUpdate: isUpdate })
                    }
                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 16,
                        fontFamily: Custom_Fonts.Montserrat_Medium
                    }}>Continue</Text>
                </TouchableOpacity>

            </SafeAreaView>

        </ScrollView>
    );
}

export default CreateProfileStep2






const styles = StyleSheet.create({

    btnViewStyle: {
        width: 110,
        flexDirection: "row",
        height: 36,
        backgroundColor: Colors.themeBlue,
        margin: 18,
        borderRadius: 8,
        justifyContent: "center"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 12,
        marginHorizontal: 4,
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    descripTextStyle: {
        fontSize: 16,
        margin: 18,
        fontFamily: Custom_Fonts.Montserrat_Regular
    },
    item: {
        backgroundColor: Colors.themeBlue,
        padding: 12,
        marginVertical: 20,
        marginHorizontal: 8,
        minWidth: 128,
        height: 74,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 19,
        color: "white",
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },
    pickerStyle: {
        flexDirection: "row",
        height: 34,
        borderRadius: 25,
        alignItems: "center",
        marginLeft: 20,
        width: 104

    },
    pickerTitleStyle: {
        width: 90,
        height: 34,
        color: "black",
        textAlign: 'center',
        fontSize: 14,
        fontFamily: Custom_Fonts.Montserrat_SemiBold,
        paddingVertical: 0,

    },

});
