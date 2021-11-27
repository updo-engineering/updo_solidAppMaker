import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, ScrollView, TextInput, Platform } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
import messaging from '@react-native-firebase/messaging';
import CustomImagePickerModal from "../Helper/CustomImagePickerModal";
import { uploadImage } from "../apiSauce/HttpInteractor";
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from "react-redux";
import {setServProv } from "../Redux/userDetail";
import Loader from '../Components/loader';

const CreateYourProfile = (props) => {
  const [fcmToken, setFcmToken] = useState("")
  let user = useSelector(state => state.userReducer).user
  let _location = useSelector(state => state.userReducer).location
  let servprovider = useSelector(state => state.userReducer).serv_provide
  const [loading, setLoading] = useState(false)
  let socialLinks = useSelector(state => state.userReducer).socialLinks

  let dispatch = useDispatch()
  useEffect(() => {
    GetToken()
  }, [])

  const [showPicker, setPickerVisible] = useState(false)
  const [imageUri, setImageUri] = useState("")
  const [imagesAry, setImagesAry] = useState({ image1: "", image2: "", image3: "", image4: "" })
  const [selectedIndex, setselectedIndex] = useState(0)
  const [userData, setUserData] = useState({ image1: "", image2: "", image3: "", image4: "", profileImg: "", name: "", aboutMe: "", location: "" })

  const GetToken = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      const token = await messaging().getToken()
      setFcmToken(token)
    }
  }


  return (
    <ScrollView
      style={{ width: "100%", height: "100%" }}
      horizontal={false}
      scrollEventThrottle={16}
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <SafeAreaView>
        <CustomImagePickerModal
          visible={showPicker}
          attachments={(data) => {
            switch (selectedIndex) {
              case 0:
                setImageUri(data.path)
                break;
              case 1:
                setImagesAry({ ...imagesAry, image1: data.path })
                break;
              case 2:
                setImagesAry({ ...imagesAry, image2: data.path })
                break;
              case 3:
                setImagesAry({ ...imagesAry, image3: data.path })
                break;
              case 4:
                setImagesAry({ ...imagesAry, image4: data.path })
                break;
              default:
                break;
            }
            uploadImage(data.path, user.userType == 'Customer').then(response => {
              console.log(response.data)
              if (response.ok) {
                if (response.data?.status === true) {
                  switch (selectedIndex) {
                    case 0:
                      setUserData({ ...userData, profileImg: response.data?.data.filename })
                      break;
                    case 1:
                      setUserData({ ...userData, image1: response.data?.data.filename })
                      break;
                    case 2:
                      setUserData({ ...userData, image2: response.data?.data.filename })
                      break;
                    case 3:
                      setUserData({ ...userData, image3: response.data?.data.filename })
                      break;
                    case 4:
                      setUserData({ ...userData, image4: response.data?.data.filename })
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
        <Text style={{ marginTop: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 20, marginHorizontal: 20, marginVertical: 8 }}>Create your profile</Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => {
            setselectedIndex(0)
            setPickerVisible(true)
          }} >
            {
              imageUri === "" ? <Image style={{ width: 100, height: 100, resizeMode: "contain", margin: 8 }} source={require("../assets/addProfile.png")} /> : <Image style={{ width: 80, height: 80, resizeMode: "cover", margin: 8, borderRadius: 50 }} source={{ uri: imageUri }} />
            }

          </TouchableOpacity>
          <View style={[styles.pickerStyle, { marginTop: 32 }]}>
            <TextInput style={styles.pickerTitleStyle}
              value={userData.name}
              onChangeText={(text) =>
                setUserData({ ...userData, name: text })
              }
              placeholder="Name" ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={[styles.pickerStyle, { marginHorizontal: 16, justifyContent: 'space-between' }]} onPress={() => {
          props.navigation.navigate('MapScreen')
        }} >

          <Text style={{ fontSize: 13, marginLeft: 15, fontFamily: Custom_Fonts.Montserrat_Medium, width: '80%' }}>
            {_location.location}
          </Text>
          {/* <TextInput 
           value={userData.location}
           onChangeText={(text) => 
             setUserData({...userData,location:text})
           }
          placeholder="Location" style={[styles.pickerTitleStyle, { width: "80%" }]}></TextInput> */}
          <Image style={{ width: 24, height: 24, resizeMode: "contain", margin: 8 }} source={require("../assets/navPin.png")} />

        </TouchableOpacity>
        {user.userType != 'Customer' ? <View>
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
              props.navigation.navigate('SocialLinkUpdate', { socialType: 'Pinterest', socialLink: socialLinks })
            }} >
              <Image style={{
                resizeMode: "contain", alignSelf: "center", width: "100%", height: 80
              }} source={require("../assets/Pinterest.png")} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialImgStyle} onPress={() => {
              props.navigation.navigate('SocialLinkUpdate', { socialType: 'Twitter', socialLink: socialLinks })
            }} >
              <Image style={{
                resizeMode: "contain", alignSelf: "center", width: "100%", height: 80
              }} source={require("../assets/Twitter.png")} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialImgStyle} onPress={() => {
              props.navigation.navigate('SocialLinkUpdate', { socialType: 'Youtube', socialLink: socialLinks })
            }} >
              <Image style={{
                resizeMode: "contain", alignSelf: "center", width: "100%", height: 80
              }} source={require("../assets/Youtube.png")} />
            </TouchableOpacity>

          </View>
        </View> : null}

        <View style={[styles.pickerStyle, { marginHorizontal: 16, height: 150 }]}>
          <TextInput style={[styles.pickerTitleStyle, { height: 120 }]}
            value={userData.aboutMe}
            textAlignVertical='top'
            onChangeText={(text) =>
              setUserData({ ...userData, aboutMe: text })
            }
            placeholder="About me" ></TextInput>
        </View>
        <Text style={{ fontSize: 17, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 16 }}>Add images</Text>
        <Text style={{ fontSize: user.userType != 'Customer' ? 15 : 13, marginLeft: 18, fontFamily: Custom_Fonts.Montserrat_Medium, marginTop: 4 }}>{user.userType != 'Customer' ? 'Select images from your gallery' : 'Have a favorite hair cut or nail style? Add any pictures that would be helpful for your TipTopper here!'}</Text>
        <View style={{ flexDirection: "row", height: 150, marginHorizontal: 16 }}>

          <TouchableOpacity onPress={() => {
            setselectedIndex(1)
            setPickerVisible(true)
          }} style={{ width: "46%", height: 120, marginTop: 16 }}>
            {imagesAry.image1 === "" ? <Image style={{ height: 120, resizeMode: "contain", width: "100%" }} source={require("../assets/rect.png")} /> : <Image style={{ height: 120, resizeMode: "stretch", width: "100%", borderRadius: 12 }} source={{ uri: imagesAry.image1 }} />}
            <Image style={{ height: 32, resizeMode: "contain", width: 32, position: "absolute", end: -8, bottom: -8 }} source={require("../assets/addBtnBlue.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setselectedIndex(2)
            setPickerVisible(true)
          }} style={{ width: "46%", height: 120, marginTop: 16, marginLeft: 16 }}>
            {imagesAry.image2 === "" ? <Image style={{ height: 120, resizeMode: "contain", width: "100%" }} source={require("../assets/rect.png")} /> : <Image style={{ height: 120, resizeMode: "stretch", width: "100%", borderRadius: 12 }} source={{ uri: imagesAry.image2 }} />}
            <Image style={{ height: 32, resizeMode: "contain", width: 32, position: "absolute", end: -8, bottom: -8 }} source={require("../assets/addBtnBlue.png")} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", height: 150, marginHorizontal: 16 }}>

          <TouchableOpacity onPress={() => {
            setselectedIndex(3)
            setPickerVisible(true)
          }} style={{ width: "46%", height: 120, marginTop: 16 }}>
            {imagesAry.image3 === "" ? <Image style={{ height: 120, resizeMode: "contain", width: "100%" }} source={require("../assets/rect.png")} /> : <Image style={{ height: 120, resizeMode: "stretch", width: "100%", borderRadius: 12 }} source={{ uri: imagesAry.image3 }} />}
            <Image style={{ height: 32, resizeMode: "contain", width: 32, position: "absolute", end: -8, bottom: -8 }} source={require("../assets/addBtnBlue.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setselectedIndex(4)
            setPickerVisible(true)
          }} style={{ width: "46%", height: 120, marginTop: 16, marginLeft: 16 }}>
            {imagesAry.image4 === "" ? <Image style={{ height: 120, resizeMode: "contain", width: "100%" }} source={require("../assets/rect.png")} /> : <Image style={{ height: 120, resizeMode: "stretch", width: "100%", borderRadius: 12 }} source={{ uri: imagesAry.image4 }} />}
            <Image style={{ height: 32, resizeMode: "contain", width: 32, position: "absolute", end: -8, bottom: -8 }} source={require("../assets/addBtnBlue.png")} />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={{
          width: "90%",
          flexDirection: "row",
          height: 50,
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
            props.navigation.navigate('CreateProfileCommon', { profileType: user.userType })
          }
        }} >
          <Text style={{
            alignSelf: "center",
            color: "white",
            fontSize: 17,
            fontFamily: Custom_Fonts.Montserrat_SemiBold
          }}>
            Continue
          </Text>
        </TouchableOpacity>
        {loading && <Loader />}

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
