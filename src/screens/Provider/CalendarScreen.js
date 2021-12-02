import React,{useState,useEffect} from "react";
import { Text, SafeAreaView, View, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors";
import TopHeaderView from "./../TopHeader/TopHeaderView";
import { Calendar } from 'react-native-calendars';
import { getSchedule} from "../../apiSauce/HttpInteractor";
import { useSelector } from "react-redux"
import {  useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import moment from 'moment'
import Loader from '../../Components/loader';
import SignInForDetailScreen from '../BeforeRegisterScreens/SignInForDetailScreen';

const getCurrentDate=()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + '/' + month + '/' + date;//format: yyyy-mm-dd;
}

const CalendarScreen = (props) => {
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(getCurrentDate())
    const token = useSelector(state => state.userReducer.token)
    const auth = useSelector(state => state.userReducer.auth)
    const [loading, setLoading] = useState(false)

    const Item = ({ item,index}) => (
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('CalendarAppointmentDetail', { appointmentData:item })
        }}  style={[styles.item,{backgroundColor : "#ECECEC"}]}>
            <Text style={[styles.title,{color:'black'}]}>{item.human_start_time} with {item.appointment_data.customer_id.name}</Text>
        </TouchableOpacity>
    );

    const getTimeSchdule = (str) => {
        setLoading(true);
        getSchedule(moment(str).format('MM/DD/yyyy'),token).then(response => {
            if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                    setAppointments(response.data.data)
                }
                else {
                    setAppointments([])
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                setAppointments([])
                Toast.show(response.problem)
            }
        });
     }

     useEffect(() =>{
        getTimeSchdule(currentDate)
      }, [])
    

    // useFocusEffect(
    //     React.useCallback(() => {
           
    //       return () => {
    //         //unfocused
    //       };
    //     }, [])
    //   );


    return (
        auth ?
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
                <Text style={{margin: 16, fontFamily:Custom_Fonts.Montserrat_Bold,fontSize:20}}>My Calendar</Text>
                    <Calendar
                        current={new Date().now}
                        markedDates={{
                            [moment(currentDate).format('yyyy-MM-DD')] :{selected: true,selectedColor: '#F0B752'}
                        }}
                        style={{ borderRadius: 1 }}
                        theme={{
                            textDayFontFamily: Custom_Fonts.Montserrat_Regular,
                            textMonthFontFamily: Custom_Fonts.Montserrat_Regular,
                            textDayHeaderFontFamily: Custom_Fonts.Montserrat_Medium,
                            selectedDayBackgroundColor: '#F0B752',
                            textDayFontSize: 12,
                            arrowColor: Colors.themeBlue,
                            textSectionTitleColor: Colors.themeBlue,
                            todayTextColor: Colors.themeBlue,
                            dayTextColor: 'black',
                            textDisabledColor: 'grey', 
                            monthTextColor: 'black', 
                            textMonthFontFamily: Custom_Fonts.Montserrat_Regular,
                            textDayFontSize: 12,
                            textMonthFontSize: 14,
                            textDayHeaderFontSize: 12,
                        }}
                        onDayPress={text => {setCurrentDate(text.dateString)
                            getTimeSchdule(text.dateString)}}
                    />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 14, margin: 16 }}>Schedule Tiptops</Text>
                    <FlatList
                        key="event"
                        style={{ marginLeft: 8, marginTop: 8 }}
                        horizontal={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={appointments}
                        renderItem={Item}
                        keyExtractor={item => item.id}
                    />
                {loading && <Loader />}

                </SafeAreaView>
            </ScrollView>
        </View> :<SignInForDetailScreen title= "Calendar" descrip= "Sign in and start planning your Tiptop: As you search, tap the hear icon to save your favorite Tiptoppers and services. " />
    );
}

export default CalendarScreen

const styles = StyleSheet.create({
    item: {
        padding: 8,
        margin: 8,
        height: 40,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 14,
        marginLeft: 12,
        color: "black",
        fontFamily: Custom_Fonts.Montserrat_SemiBold
    },


});
