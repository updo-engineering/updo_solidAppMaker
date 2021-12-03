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
        day: 'MONDAY',
        start_time: '',
        end_time: '',

    },
    {
        day: 'TUESDAY',
        start_time: '',
        end_time: '',
    },
    {
        day: 'WEDNESDAY',
        start_time: '',
        end_time: '',
    },
    {
        day: 'THURSDAY',
        start_time: '',
        end_time: '',
    },
    {
        day: 'FRIDAY',
        start_time: '',
        end_time: '',
    },
    {
        day: 'SATURDAY',
        start_time: '',
        end_time: '',
    },
    {
        day: 'SUNDAY',
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


    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        DATA[id].start_time = moment(date).format('h:mm A')
        hideDatePicker()
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm1 = (date) => {
        DATA[id].end_time = moment(date).format('h:mm A')
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
                    fontFamily: Custom_Fonts.Montserrat_Medium,
                }}>{item.start_time.length === 0?'00 : 00':item.start_time}</Text>
                {/* <TextInput 
                
                style={styles.pickerTitleStyle} placeholder="00" keyboardType="number-pad" ></TextInput> */}
            </TouchableOpacity>
          

            <View style={{ width:15,height:1,backgroundColor:'black',marginHorizontal: 8 }}/>

            <TouchableOpacity
                onPress={() => {
                    setDatePickerVisibility1(true);
                    setId(index)
                }}
                style={[styles.pickerStyle, { justifyContent: 'center', alignItems: 'center', }]}>
                <Text style={{ textAlign: 'center', fontSize: 12,
                    fontFamily: Custom_Fonts.Montserrat_Medium, }}>{item.end_time.length === 0?'00:00':item.end_time}</Text>
            </TouchableOpacity>

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
            style={{ width: "100%", height: "100%" ,backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Complete your profile" />
              
                <Text style={{ fontSize: 20, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 16 }}>General availability</Text>

                <FlatList
                    key="event"
                    style={{ marginTop: 20 }}
                    horizontal={false}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={DATA}
                    renderItem={EventItem}
                    keyExtractor={item => item.id}
                />

         

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
                        fontSize: 16,
                        fontFamily: Custom_Fonts.Montserrat_Medium
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
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        width: "38%"

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
