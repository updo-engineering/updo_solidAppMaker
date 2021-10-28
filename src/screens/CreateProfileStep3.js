import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { setServProv } from "../Redux/userDetail";

const DATA = [
    {       
        day: 'Monday',
        start_time: '',
        end_time: '',

    },
    {
        day: 'Tuesday',
        start_time: '',
        end_time: '',
    },
    {
        day: 'Wednesday',
        start_time: '',
        end_time: '',
    },
    {
        day: 'Thursday',
        start_time: '',
        end_time: '',
    },
    {
        day: 'Friday',
        start_time: '',
        end_time: '',
    },
    {
        day: 'Saturday',
        start_time: '',
        end_time: '',
    },
    {
        day: 'Sunday',
        start_time: '',
        end_time: '',
    },
];



const CreateProfileStep3 = ({ navigation }) => {

    const [timevalue, settimevalue] = useState('AM')
    const [id, setId] = useState(null)
    const [multiselect, setMultiselect] = useState([])
    const [notes,setnotes] = useState('')


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    let servprovider1 = useSelector(state=>state.userReducer).serv_provide
    console.log(servprovider1,'servvvvvvvv1234')
    let dispatch = useDispatch()

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        DATA[id].start_time = moment(date).format('HH:mm')
        hideDatePicker();
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm1 = (date) => {
        DATA[id].end_time = moment(date).format('HH:mm')
        hideDatePicker1();
    };

    const EventItem = ({ item, index }) => (
        <View style={{
            flexDirection: "row", height: 32, margin: 16, alignItems: "center"
        }}>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, width: "13%" }}>{item.day.substring(0,3)}</Text>

            <TouchableOpacity
                onPress={() => {

                    setDatePickerVisibility(true)
                    setId(index)
                }}

                style={[styles.pickerStyle, { marginLeft: 16, justifyContent: 'center', alignItems: 'center', }]}>

                <Text style={{
                    textAlign: 'center', fontSize: 12,
                    fontFamily: Custom_Fonts.Montserrat_SemiBold,
                }}>{item.start_time.length === 0?'00':item.start_time.split(':')[0] ?? "00"}</Text>
                {/* <TextInput 
                
                style={styles.pickerTitleStyle} placeholder="00" keyboardType="number-pad" ></TextInput> */}
            </TouchableOpacity>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, marginHorizontal: 8 }}>:</Text>
            <View style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', }]}>
                <Text style={{ textAlign: 'center' }}>{item.start_time.length === 0?'00':item.start_time.split(':')[1] ?? "00"}</Text>
            </View>

            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, marginHorizontal: 8 }}>-</Text>

            <TouchableOpacity
                onPress={() => {
                    setDatePickerVisibility1(true);
                    setId(index)
                }}
                style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', }]}>
                <Text style={{ textAlign: 'center' }}>{item.end_time.length === 0?'00':item.end_time.split(':')[0] ?? "00"}</Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, marginHorizontal: 8 }}>:</Text>
            <View style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', }]}>
                <Text style={{ textAlign: 'center' }}>{item.end_time.length === 0?'00':item.end_time.split(':')[1] ?? "00"}</Text>
            </View>

            {/* <TouchableOpacity
                style={{
                    flexDirection: "row",
                    height: 26,
                    backgroundColor: "#F0B752",
                    borderRadius: 13,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "12%", position: "absolute", end: 8
                }}>
                <Text style={{
                    color: "white",
                    fontSize: 12,
                    fontFamily: Custom_Fonts.Montserrat_SemiBold,
                }}>{item.starttime.length === 0?'AM':moment(item.starttime).format('A')}</Text>
            </TouchableOpacity> */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale="en_GB"
                
            />
             <DateTimePickerModal
                isVisible={isDatePickerVisible1}
                mode="time"
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
                locale="en_GB"
            />
        </View>
    );

    return (
        <ScrollView
            style={{ width: "100%", height: "100%" }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Create your profile" />
                <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
                    //action
                }} >
                    <Text style={styles.btnTitleStyle}>Updoer Profile</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 17, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 16 }}>General availability</Text>

                <FlatList
                    key="event"
                    style={{ marginLeft: 8, marginTop: 40 }}
                    horizontal={false}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={DATA}
                    renderItem={EventItem}
                    keyExtractor={item => item.id}
                />

                <View style={{
                    margin: 16, borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 25, height: 44, alignItems: "center", flexDirection: "row"
                }}>
                    <TextInput 
                    value={notes}
                    onChangeText={(t)=>{
                        setnotes(t)
                    }}
                    style={[styles.pickerTitleStyle, { marginLeft: 16 }]} placeholder="Add a note" ></TextInput>
                </View>

                <TouchableOpacity style={{
                    width: "90%",
                    flexDirection: "row",
                    height: 50,
                    backgroundColor: Colors.themeBlue,
                    marginHorizontal: 25,
                    marginTop: 25,
                    marginBottom: 60,
                    borderRadius: 25,
                    justifyContent: "center"
                }} onPress={() => {
                    
                    let _data ={
                        availability: DATA,
                        note:notes
                       }
                       servprovider1={
                        ...servprovider1,
                        serv_provide_3:_data
                      }
                   
                    dispatch(setServProv(servprovider1))
                
                     navigation.navigate('CreateProfileStep4')
                }} >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 17,
                        fontFamily: Custom_Fonts.Montserrat_SemiBold
                    }}>Continue</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
    );
}

export default CreateProfileStep3




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
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 8,
        minWidth: 120,
        height: 74,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginEnd: 16,
        color: "white",
        fontFamily: Custom_Fonts.Montserrat_Bold
    },
    pickerStyle: {
        flexDirection: "row",
        height: 26,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 13,
        alignItems: "center",
        width: "14%"

    },
    pickerTitleStyle: {
        marginLeft: 4,
        paddingVertical: 0,
        width: "100%",
        color: "black",
        fontSize: 12,
        fontFamily: Custom_Fonts.Montserrat_SemiBold,


    },

});
