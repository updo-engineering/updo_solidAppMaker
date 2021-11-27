import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput, Keyboard, Platform } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import TopHeaderView from "./TopHeader/TopHeaderView";
import Toast from 'react-native-simple-toast';
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { setServProv } from "../Redux/userDetail";
import { updateCustomer } from "../apiSauce/HttpInteractor";
import messaging from '@react-native-firebase/messaging';
import { SetUser } from '../Redux/userDetail'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/loader';

const DATA = [
    {
        id: '0',
        title: 'What gender do you identify as?',
        options: [{ title: 'Male', isSelected: false }, { title: 'Female', isSelected: false }, { title: 'Other', isSelected: false }, { title: 'Prefer not to answer', isSelected: false }],
        isSelected: false
    },
    {
        id: '1',
        title: 'What is your age?',
        options: [{ title: '18-24 years old', isSelected: false }, { title: '25-34 years old', isSelected: false }, { title: '35-44 years old', isSelected: false }, { title: '45-54 years old', isSelected: false }, { title: '55-64 years old', isSelected: false }, { title: '65+ years old', isSelected: false }, { title: 'Prefer not to answer', isSelected: false }],
        isSelected: false
    },
    {
        id: '2',
        title: 'What is your ethnicity?',
        options: [{ title: 'African-American', isSelected: false }, { title: 'Latino or Hispanic', isSelected: false }, { title: 'Caucasian', isSelected: false }, { title: 'Asian', isSelected: false }, { title: 'Native American', isSelected: false }, { title: 'Native Hawaiian or Pacific Islander', isSelected: false }, { title: 'Two or more', isSelected: false }, { title: 'Prefer not to answer', isSelected: false }],
        isSelected: false
    },
    {
        id: '3',
        title: 'How many children do you have?',
        options: [{ title: 'None', isSelected: false }, { title: '1', isSelected: false }, { title: '2-4', isSelected: false }, { title: 'Prefer not to answer', isSelected: false }],
        isSelected: false
    },
    {
        id: '4',
        title: 'Which languages are you fluent in?',
        options: [{ title: 'English', isSelected: false }, { title: 'Spanish', isSelected: false }, { title: 'Mandarin', isSelected: false }, { title: 'Russian', isSelected: false }, { title: 'Portuguese', isSelected: false }, { title: 'Other', isSelected: false }, { title: 'Prefer not to answer', isSelected: false }],
        isSelected: false
    },
    {
        id: '5',
        title: 'What is your employment status?',
        options: [{ title: 'Employed Full Time', isSelected: false }, { title: 'Employed Part Time', isSelected: false }, { title: 'Student', isSelected: false }, { title: 'Retired', isSelected: false }, { title: 'Prefer not to answer', isSelected: false }],
        isSelected: false
    },
    {
        id: '6',
        title: 'What is the highest degree received?',
        options: [{ title: 'Some High School', isSelected: false }, { title: 'High School', isSelected: false }, { title: 'Trade School', isSelected: false }, { title: 'Bachelor’s Degree', isSelected: false }, { title: 'Master’s Degree', isSelected: false }, { title: 'Ph.D. or higher', isSelected: false }, { title: 'Prefer not to answer', isSelected: false }],
        isSelected: false
    }
];

const CreateProfileCommon = ({ navigation, route }) => {
    let servprovider = useSelector(state => state.userReducer).serv_provide
    let token = useSelector(state => state.userReducer).token
    let profileType = route.params?.profileType
    let dispatch = useDispatch()
    let [infoData, setInfoData] = useState(DATA)
    const [fcmToken, setFcmToken] = useState("")
    const [loading, setLoading] = useState(false)
    let gender = ''
    let age = ''
    let ethnicity = ''
    let children = ''
    let languages = ''
    let employment = ''
    let degree = ''

    const storeData = async value => {
        setLoading(true);
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('UserDetail', jsonValue);
          dispatch(SetUser(value.user));
          navigation.navigate('TabNavStack')
        } catch (e) {
          Toast.show('Something Went Wrong Please Try Again Later');
        } finally {
          setLoading(false);
        }
      };

    const GetToken = async () => {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            const token = await messaging().getToken()
            setFcmToken(token)
        }
    }

    useEffect(() => {
        GetToken()
    }, [])

    const OptionItem = (item, index, parentindex) => {
        return (
            <TouchableOpacity onPress={() => {
                let dataC = _.cloneDeep(infoData)
                if (parentindex == 3 && profileType != 'Customer') {
                    dataC[parentindex].options[index].isSelected = !dataC[parentindex].options[index].isSelected
                }
                else {
                    for (let indexer = 0; indexer < dataC[parentindex].options.length; indexer++) {
                        if (index == indexer) {
                            dataC[parentindex].options[indexer].isSelected = true
                        }
                        else {
                            dataC[parentindex].options[indexer].isSelected = false
                        }
                    }
                }
                setInfoData(dataC)
            }}
                style={
                    { marginHorizontal: 16, flexDirection: 'row', borderTopWidth: index == 0 ? 0 : 0.5, borderColor: 'black', padding: 8 }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: 18, height: 18, borderRadius: 2, borderWidth: item.isSelected ? 0 : 0.5, borderColor: 'black', marginVertical: 4, backgroundColor: item.isSelected ? Colors.themeBlue : null }} />
                    <Text style={{ fontSize: 14, fontFamily: Custom_Fonts.Montserrat_Regular, marginVertical: 2, marginLeft: 16, color: 'black' }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const InfoItem = ({ item, index }) => (
        <View>
            {profileType == 'Customer' && index == 4 || profileType != 'Customer' && index == 3 ? null :
                <TouchableOpacity onPress={() => {
                    let dataC = _.cloneDeep(infoData)
                    dataC[index].isSelected = !dataC[index].isSelected
                    setInfoData(dataC)
                }} style={{ borderRadius: 16, borderWidth: 1, borderColor: 'black', marginHorizontal: 16, marginVertical: 8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontFamily: Custom_Fonts.Montserrat_Regular, marginVertical: 16, marginLeft: 16 }}>{item.title}</Text>
                        <Image source={require('../assets/down.png')} style={{ width: 16, height: 16, alignSelf: 'center', resizeMode: 'contain', marginRight: 16 }} /></View>
                    {item.isSelected ? <FlatList
                        key="options"
                        horizontal={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        data={item.options}
                        renderItem={(itemData) => {
                            return (OptionItem(itemData.item, itemData.index, index))
                        }}
                        keyExtractor={item => item.id}
                    /> : null}
                </TouchableOpacity>}</View>
    );


    return (
        <ScrollView
            key="parent"
            style={{ width: "100%", height: "100%" }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>
                <TopHeaderView title="Create your profile" />
                <Text style={{ fontSize: 15, marginLeft: 20, fontFamily: Custom_Fonts.Montserrat_Regular, marginTop: 4, alignSelf: "center", textAlign: "center" }}>
                    Everyone matters. TipTop is for everyone.{'\n\n'}Welcome to our growing community!
                </Text>

                <FlatList
                    key="personalInfo"
                    style={{ marginLeft: 8, marginTop: 20 }}
                    horizontal={false}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={infoData}
                    renderItem={InfoItem}
                    keyExtractor={item => item.id}
                />

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
                    Keyboard.dismiss()
                    let genderData = infoData[0].options.filter((data) => data.isSelected == true)
                    let ageData = infoData[1].options.filter((data) => data.isSelected == true)
                    let ethnicityData = infoData[2].options.filter((data) => data.isSelected == true)
                    let childData = infoData[3].options.filter((data) => data.isSelected == true)
                    let langData = infoData[4].options.filter((data) => data.isSelected == true)
                    let employmentData = infoData[5].options.filter((data) => data.isSelected == true)
                    let degreeData = infoData[6].options.filter((data) => data.isSelected == true)
                    if (genderData.length < 1) {
                        Toast.show('Please select a gender option')
                    }
                    else if (ageData.length < 1) {
                        Toast.show('Please select a age option')
                    }
                    else if (ethnicityData.length < 1) {
                        Toast.show('Please select a Ethnicity')
                    }
                    else if (childData.length < 1 && profileType == 'Customer') {
                        Toast.show('Please select one childen option')
                    }
                    else if (langData.length < 1 && profileType != 'Customer') {
                        Toast.show('Please select one languages option')
                    }
                    else if (employmentData.length < 1) {
                        Toast.show('Please select one employment option')
                    }
                    else if (degreeData.length < 1) {
                        Toast.show('Please select one degree option')
                    }
                    else {
                        gender = genderData[0].title
                        age = ageData[0].title
                        ethnicity = ethnicityData[0].title
                        employment = employmentData[0].title
                        degree = degreeData[0].title
                        children = childData[0].title
                        let lang = []
                        for (let index = 0; index < langData.length; index++) {
                            const element = langData[index];
                            lang.push(element.title)
                        }
                        languages = lang.join()
                        let data = servprovider.serv_provide_1
                        servprovider = {
                            ...servprovider,
                            newData: { gender, age, ethnicity, employment, degree, children, languages }
                        }
                        dispatch(setServProv(servprovider))

                        if (profileType == 'Customer') {
                            setLoading(true)
                            updateCustomer(Platform.OS,fcmToken,data.userData.profileImg,data.userData.name,data.userData.aboutMe,data.images,{"lat": data.location.lat, "lon": data.location.lon, "location": data.location.location},gender,age,ethnicity,children,employment,degree,token).then(response => {
                                if (response.ok) {
                                    setLoading(false)
                                  if (response.data?.status === true) {
                                    Toast.show(response.data.message)
                                    storeData({
                                        user: response.data?.data
                                      })
                                    setTimeout(() => {
                                      navigation.navigate('UserProfile')
                                    }, 1200);
                                  } else {
                                    setLoading(false)
                                    Toast.show(response.data.message)
                                  }
                                } else {
                                  setLoading(false)
                                  Toast.show(response.problem)
                                }
                              });
                        }
                        else {
                            navigation.navigate('CreateProfileStep2')
                        }
                    }
                }
                } >
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 17,
                        fontFamily: Custom_Fonts.Montserrat_SemiBold
                    }}>Continue</Text>
                </TouchableOpacity>
                {loading && <Loader />}

            </SafeAreaView>

        </ScrollView>
    );
}

export default CreateProfileCommon


