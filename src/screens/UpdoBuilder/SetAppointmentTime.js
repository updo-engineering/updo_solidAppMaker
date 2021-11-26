import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import { Calendar } from 'react-native-calendars';
import moment from 'moment'
import TopHeaderView from "../TopHeader/TopHeaderView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from "react-redux";
import { setAppointmentData } from "../../Redux/userDetail";



const SetAppointmentTime = (props) => {
    let appointmentData = useSelector(state => state.userReducer).appointmentData
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const [time, setTime] = useState({
        start_time: '00:00',
        end_time: '00:00'
    })

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm1 = (date) => {
        time.end_time = moment(date).format('hh:mm A')
        setTime(time)
        hideDatePicker1();
    };

    const handleConfirm = (date) => {
        time.start_time = moment(date).format('hh:mm a')
        setTime(time)
        hideDatePicker();
    };

    const getCurrentDate = () => {
        handleConfirm(moment.unix(appointmentData.time))
        handleConfirm1(moment.unix(appointmentData.time).add(1, 'hours'))
        let a = moment.unix(appointmentData.time).format('yyyy-MM-DD')
        return a
    }

    useEffect(() => {
        getCurrentDate()
    }, [])

    const [currentDate, setCurrentDate] = useState(getCurrentDate)

    let dispatch = useDispatch()


    return (
        <View style={{ backgroundColor: 'white' }}>
            <ScrollView
                key="scroll"
                style={{ width: "100%", height: "100%" }}
                horizontal={false}
                scrollEventThrottle={16}
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                <SafeAreaView>
                    <TopHeaderView title="Set Appointment Time" />
                    <Calendar
                        current={new Date().now}
                        markedDates={{
                            [currentDate]: { selected: true, selectedColor: Colors.themeBlue }
                        }}
                        style={{ borderRadius: 1 }}
                        theme={{
                            textDayFontFamily: Custom_Fonts.Montserrat_Regular,
                            textMonthFontFamily: Custom_Fonts.Montserrat_Regular,
                            textDayHeaderFontFamily: Custom_Fonts.Montserrat_Medium,
                            selectedDayBackgroundColor: Colors.themeBlue,
                            textDayFontSize: 12,
                            arrowColor: 'black',
                            textSectionTitleColor: 'black',
                            todayTextColor: 'black',
                            dayTextColor: 'black',
                            textDisabledColor: 'grey',
                            monthTextColor: 'black',
                            textMonthFontFamily: Custom_Fonts.Montserrat_Regular,
                            textDayFontSize: 12,
                            textMonthFontSize: 14,
                            textDayHeaderFontSize: 12,
                        }}
                        onDayPress={text => { setCurrentDate(text.dateString) }}
                    />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 17, margin: 16 }}>{moment(currentDate).format('MMMM DD, yyyy')}</Text>
                    <View style={{
                        flexDirection: "row", margin: 16, alignSelf: "center"
                    }}>

                        <View style={{ height: 60, width: '90%', flexDirection: "row", justifyContent: 'space-between' }}>
                            <View style={{ width: '48%', height: 60 }}>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, margin: 16, alignSelf: "center" }}>Start Time</Text>
                                <TouchableOpacity onPress={() => {
                                setDatePickerVisibility(true)
                            }} style={{ width: '80%', height: 40, borderRadius: 4, borderWidth: 1, borderColor: 'grey',alignSelf: "center",justifyContent: 'center'}} >
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, alignSelf: "center",color:'black',opacity:0.5 }}>{time.start_time}</Text>
                                    </TouchableOpacity>
                            </View>

                            <View style={{ width: 20, height: 2, backgroundColor:'grey',alignSelf: "center",marginTop:100 }} />


                            <View style={{ width: '48%', height: 60 }}>
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, margin: 16, alignSelf: "center" }}>End Time</Text>
                                <TouchableOpacity onPress={() => {
                                setDatePickerVisibility1(true)
                            }} style={{ width: '80%', height: 40, borderRadius: 4, borderWidth: 1, borderColor: 'grey',alignSelf: "center",justifyContent: 'center'}} >
                                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 15, alignSelf: "center",color:'black',opacity:0.5 }}>{time.end_time}</Text>
                                    </TouchableOpacity>
                            </View>

                        </View>



                        {/* <TouchableOpacity
                            onPress={() => {
                                setDatePickerVisibility(true)
                            }}

                            style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center' }]}>

                            <Text style={{
                                textAlign: 'center'
                            }}>{time.start_time.length === 0 ? '00' : time.start_time.split(':')[0] ?? "00"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, marginHorizontal: 8 }}>:</Text>
                        <View style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', }]}>
                            <Text style={{ textAlign: 'center' }}>{time.start_time.length === 0 ? '00' : time.start_time.split(':')[1] ?? "00"}</Text>
                        </View>

                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, marginHorizontal: 8 }}>-</Text>

                        <TouchableOpacity
                            onPress={() => {
                                setDatePickerVisibility1(true);
                            }}
                            style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', }]}>
                            <Text style={{ textAlign: 'center' }}>{time.end_time.length === 0 ? '00' : time.end_time.split(':')[0] ?? "00"}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, marginHorizontal: 8 }}>:</Text>
                        <View style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', }]}>
                            <Text style={{ textAlign: 'center' }}>{time.end_time.length === 0 ? '00' : time.end_time.split(':')[1] ?? "00"}</Text>
                        </View> */}
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
                    <TouchableOpacity style={{
                        width: "90%",
                        flexDirection: "row",
                        height: 46,
                        backgroundColor: Colors.themeBlue,
                        marginHorizontal: 25,
                        marginTop: 40,
                        marginBottom: 15,
                        borderRadius: 23,
                        justifyContent: "center", alignSelf: 'center'
                    }} onPress={() => {
                        if (time.start_time == "" || time.start_time == '00') {
                            Toast.show('Please choose a time slot first')
                        }
                        else {
                            appointmentData = {
                                ...appointmentData,
                                start_time: moment(currentDate + " " + time.start_time).unix(),
                                end_time: moment(currentDate + " " + time.end_time).unix()
                            }
                            dispatch(setAppointmentData(appointmentData))
                            props.navigation.navigate('UpdoBuildStep1')
                        }
                    }} >
                        <Text style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 17,
                            fontFamily: Custom_Fonts.Montserrat_SemiBold
                        }}>Save</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </View>

    );
}

export default SetAppointmentTime


const styles = StyleSheet.create({
    pickerStyle: {
        flexDirection: "row",
        height: 26,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 13,
        width: "20%"
    }

});
