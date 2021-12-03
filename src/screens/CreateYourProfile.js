import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, TextInput, Platform } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import messaging from '@react-native-firebase/messaging';
import CustomImagePickerModal from "../Helper/CustomImagePickerModal";
import { uploadImage } from "../apiSauce/HttpInteractor";
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from "react-redux";
import { setServProv } from "../Redux/userDetail";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetAuth } from '../Redux/userDetail'

const CreateYourProfile = (props) => {
  const [fcmToken, setFcmToken] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState(new Date())

  let user = useSelector(state => state.userReducer).user
  let _location = useSelector(state => state.userReducer).location
  let servprovider = useSelector(state => state.userReducer).serv_provide
  let socialLinks = useSelector(state => state.userReducer).socialLinks

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  let dispatch = useDispatch()

  const handleConfirm = (date) => {
    setDob(date)
    let dob = moment(date).format('D.M.YYYY')
    setUserData({ ...userData, dob: dob })
    hideDatePicker();
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('UserDetail');
      dispatch(SetAuth(false));
    } catch (error) {
      console.error(error);
      await AsyncStorage.removeItem('UserDetail');
      dispatch(SetAuth(false));
    }
  };


  useEffect(() => {
    GetToken()
  }, [])

  const [showPicker, setPickerVisible] = useState(false)
  const [imageUri, setImageUri] = useState(user?.profile_pic ?? '')
  const [imagesAry, setImagesAry] = useState({ image1: "", image2: "", image3: "", image4: "" })
  const [selectedIndex, setselectedIndex] = useState(0)
  const [userData, setUserData] = useState({ image1: "", image2: "", image3: "", image4: "", profileImg: "", name: user?.name ?? '', aboutMe: "", location: "", dob: 'Date of birth' })

  const GetToken = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      const token = await messaging().getToken()
      setFcmToken(token)
    }
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
        <CustomImagePickerModal
          visible={showPicker}
          attachments={(data) => {
            uploadImage(data.path, user.user_type == 'Customer').then(response => {
              if (response.ok) {
                if (response.data?.status === true) {
                  switch (selectedIndex) {
                    case 0:
                      setUserData({ ...userData, profileImg: response.data?.data.filename })
                      setImageUri(data.path)
                      break;
                    case 1:
                      setUserData({ ...userData, image1: response.data?.data.filename })
                      setImagesAry({ ...imagesAry, image1: data.path })
                      break;
                    case 2:
                      setUserData({ ...userData, image2: response.data?.data.filename })
                      setImagesAry({ ...imagesAry, image2: data.path })
                      break;
                    case 3:
                      setUserData({ ...userData, image3: response.data?.data.filename })
                      setImagesAry({ ...imagesAry, image3: data.path })

                      break;
                    case 4:
                      setUserData({ ...userData, image4: response.data?.data.filename })
                      setImagesAry({ ...imagesAry, image4: data.path })
                      break;
                    default:
                      break;
                  }
                  Toast.show(response.data.message)
                } else {
                  Toast.show(response.data.message)
                }
              } else {
                Toast.show(response.problem)
              }
            });
          }}
          pressHandler={() => {
            setPickerVisible(false)
          }}
        />
        <Text style={{ marginTop: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 20, marginHorizontal: 20, marginVertical: 8 }}>Complete your profile</Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => {
            setselectedIndex(0)
            setPickerVisible(true)
          }} >
            {
              imageUri === "" ? <Image style={{ width: 100, height: 100, resizeMode: "contain", margin: 8 }} source={require("../assets/addProfile.png")} /> : <Image style={{ width: 80, height: 80, resizeMode: "cover", margin: 8, borderRadius: 50 }} source={{ uri: imageUri }} />
            }
            {imageUri === "" ? <Image style={{ width: 60, height: 60, resizeMode: "contain", position: 'absolute', end: 0, bottom: 0 }} source={require("../assets/add.png")} />
              : null}
          </TouchableOpacity>
          <View style={[styles.pickerStyle, { marginTop: 32 }]}>
            <TextInput style={styles.pickerTitleStyle}
              value={userData.name}
              placeholderTextColor='rgba(0,0,0,0.5)'
              onChangeText={(text) =>
                setUserData({ ...userData, name: text })
              }
              placeholder="First & Last Name" ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={[styles.pickerStyle, { marginHorizontal: 16, justifyContent: 'space-between' }]} onPress={() => {
          setDatePickerVisibility(true)
        }} >

          <Text style={{ fontSize: 14, marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Regular, width: '80%',color: userData.dob == 'Date of birth' ? 'rgba(0,0,0,0.5)' : 'black' }}>
            {userData.dob}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={[styles.pickerStyle, { marginHorizontal: 16, justifyContent: 'space-between' }]} onPress={() => {
          props.navigation.navigate('MapScreen')
        }} >

          <Text style={{ fontSize: 14, marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Regular, width: '80%',color: _location.location == 'Location' ? 'rgba(0,0,0,0.5)' : 'black' }}>
            {_location.location}
          </Text>
          <Image style={{ width: 24, height: 24, resizeMode: "contain", margin: 8 }} source={require("../assets/navPin.png")} />

        </TouchableOpacity>



        {user.user_type != 'Customer' ? <View>
          <Text style={{ fontSize: 17, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 16 }}>Connect with social media</Text>
          <View style={{ flexDirection: "row", height: 120, justifyContent: "space-between", alignContent: "center" }}>
            <TouchableOpacity style={styles.socialImgStyle} onPress={() => {
              props.navigation.navigate('SocialLinkUpdate', { socialType: 'Instagram', socialLink: socialLinks })
            }} >
              <Image style={{
                resizeMode: "contain", alignSelf: "center", width: "100%", height: 80
              }} source={require("../assets/Instagram.png")} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialImgStyle} onPress={() => {
              props.navigation.navigate('SocialLinkUpdate', { socialType: 'Facebook', socialLink: socialLinks })
            }} >
              <Image style={{
                resizeMode: "contain", alignSelf: "center", width: "100%", height: 80
              }} source={require("../assets/socialFb.png")} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialImgStyle} onPress={() => {
              props.navigation.navigate('SocialLinkUpdate', { socialType: 'Twitter', socialLink: socialLinks })
            }} >
              <Image style={{
                resizeMode: "contain", alignSelf: "center", width: "100%", height: 80
              }} source={require("../assets/Twitter.png")} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialImgStyle} onPress={() => {
              props.navigation.navigate('SocialLinkUpdate', { socialType: 'TikTok', socialLink: socialLinks })
            }} >
              <Image style={{
                resizeMode: "contain", alignSelf: "center", width: "100%", height: 80
              }} source={require("../assets/tiktok.png")} />
            </TouchableOpacity>

          </View>
        </View> : null}

        <View style={[styles.pickerStyle, { marginHorizontal: 16, height: 150 }]}>
          <TextInput style={[styles.pickerTitleStyle, { height: '100%', textAlignVertical: 'top' }]}
            value={userData.aboutMe}
            textAlignVertical='top'
            placeholderTextColor='rgba(0,0,0,0.5)'
            onChangeText={(text) =>
              setUserData({ ...userData, aboutMe: text })
            }
            placeholder="About me" ></TextInput>
        </View>
        <Text style={{ fontSize: 17, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 16 }}>Add images</Text>
        <Text style={{ fontSize: user.user_type != 'Customer' ? 15 : 13, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 4 }}>{user.user_type != 'Customer' ? 'Select images from your gallery' : 'Have a favorite hair cut or nail style? Add any pictures that would be helpful for your TipTopper here!'}</Text>
        <View style={{ flexDirection: "row", height: 150, marginHorizontal: 16 }}>

          <TouchableOpacity onPress={() => {
            setselectedIndex(1)
            setPickerVisible(true)
          }} style={{ width: "46%", height: 120, marginTop: 16 }}>
            {imagesAry.image1 === "" ? <Image style={{ height: 120, resizeMode: "contain", width: "100%" }} source={require("../assets/rect.png")} /> : <Image style={{ height: 120, resizeMode: "stretch", width: "100%", borderRadius: 12 }} source={{ uri: imagesAry.image1 }} />}
            <Image style={{ height: 90, resizeMode: "contain", width: 90, position: "absolute", end: -32, bottom: -40 }} source={require("../assets/add.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setselectedIndex(2)
            setPickerVisible(true)
          }} style={{ width: "46%", height: 120, marginTop: 16, marginLeft: 16 }}>
            {imagesAry.image2 === "" ? <Image style={{ height: 120, resizeMode: "contain", width: "100%" }} source={require("../assets/rect.png")} /> : <Image style={{ height: 120, resizeMode: "stretch", width: "100%", borderRadius: 12 }} source={{ uri: imagesAry.image2 }} />}
            <Image style={{ height: 90, resizeMode: "contain", width: 90, position: "absolute", end: -32, bottom: -40 }} source={require("../assets/add.png")} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", height: 150, marginHorizontal: 16 }}>

          <TouchableOpacity onPress={() => {
            setselectedIndex(3)
            setPickerVisible(true)
          }} style={{ width: "46%", height: 120, marginTop: 16 }}>
            {imagesAry.image3 === "" ? <Image style={{ height: 120, resizeMode: "contain", width: "100%" }} source={require("../assets/rect.png")} /> : <Image style={{ height: 120, resizeMode: "stretch", width: "100%", borderRadius: 12 }} source={{ uri: imagesAry.image3 }} />}
            <Image style={{ height: 90, resizeMode: "contain", width: 90, position: "absolute", end: -32, bottom: -40 }} source={require("../assets/add.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setselectedIndex(4)
            setPickerVisible(true)
          }} style={{ width: "46%", height: 120, marginTop: 16, marginLeft: 16 }}>
            {imagesAry.image4 === "" ? <Image style={{ height: 120, resizeMode: "contain", width: "100%" }} source={require("../assets/rect.png")} /> : <Image style={{ height: 120, resizeMode: "stretch", width: "100%", borderRadius: 12 }} source={{ uri: imagesAry.image4 }} />}
            <Image style={{ height: 90, resizeMode: "contain", width: 90, position: "absolute", end: -32, bottom: -40 }} source={require("../assets/add.png")} />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={{
          width: "90%",
          flexDirection: "row",
          height: 50,
          alignSelf:'center',
          backgroundColor: Colors.themeBlue,
          margin: 25,
          borderRadius: 25,
          justifyContent: "center"
        }} onPress={() => {
          let data = []
          if (userData.image1 != "") {
            data = [...data, { "image_link": userData.image1 }]
          }
          if (userData.image2 != "") {
            data = [...data, { "image_link": userData.image2 }]
          }
          if (userData.image3 != "") {
            data = [...data, { "image_link": userData.image3 }]
          }
          if (userData.image4 != "") {
            data = [...data, { "image_link": userData.image4 }]
          }
          if (userData.name == "") {
            Toast.show("Please enter your name")
          }
          else if (userData.dob == "Date of birth" || userData.dob == "") {
            Toast.show("Please enter your date of birth")
          }
          else if (moment(new Date()).diff(dob, 'years') < 18) {
            Toast.show("Age must be 18 years or old")
          }
          else if (userData.profileImg == "") {
            Toast.show("Please upload your profile picture")
          }
          else if (_location.location == "") {
            Toast.show("Please provide your location")
          }
          else if (data.length == 0) {
            Toast.show("Please upload at least 1 image(attachment)")
          }
          else if (userData.aboutMe == "") {
            Toast.show("Please provide some information about you")
          }
          else {
            let _user = {
              userData: userData,
              location: _location, images: data, fcm: fcmToken
            }
            servprovider = {
              ...servprovider,
              serv_provide_1: _user
            }
            dispatch(setServProv(servprovider))
            props.navigation.navigate('CreateProfileCommon', { profileType: user.user_type })
          }
        }} >
          <Text style={{
            alignSelf: "center",
            color: "white",
            fontSize: 16,
            fontFamily: Custom_Fonts.Montserrat_Medium
          }}>
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
         width: "90%",
         flexDirection: "row",
         height: 50,
         borderColor: Colors.themeBlue,
         borderWidth:1,
         backgroundColor: 'white',
         marginHorizontal: 25,
         marginBottom:40,
         borderRadius: 25,
         alignSelf:'center',
         justifyContent: "center"
        }} onPress={() => {
          signOut()

        }} >
          <Text style={{
            alignSelf: "center",
            color: Colors.themeBlue,
            fontSize: 16,
            fontFamily: Custom_Fonts.Montserrat_Medium
          }}>Sign Out</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          locale="en_GB"
          maximumDate={new Date()}
        />

      </SafeAreaView>

    </ScrollView>
  );
}

export default CreateYourProfile

const styles = StyleSheet.create({
  headerTextStyle: {
    margin: 18,
    fontSize: 25,
    fontFamily: Custom_Fonts.Montserrat_Bold
  },
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
  pickerStyle: {
    flexDirection: "row",
    height: 50,
    marginVertical: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignContent: "center",
    alignItems: "center",
    
  },
  pickerTitleStyle: {
    width: "60%",
    color: "black",
    fontSize: 15,
    fontFamily: Custom_Fonts.Montserrat_Regular,
    marginLeft: 16
  },
  semiBoldTitle: {
    color: "black",
    fontSize: 17,
    fontFamily: Custom_Fonts.Montserrat_SemiBold,
    marginLeft: 16,
    alignSelf: "center"
  },

  socialImgStyle: {
    alignSelf: "center",
    resizeMode: "contain",
    width: "25%",
    height: 90
  }


});
