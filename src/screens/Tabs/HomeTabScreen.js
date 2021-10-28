import React, { useEffect, useState } from "react";
import { Text, ScrollView, Dimensions, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
const { width, height } = Dimensions.get('window');
import { Custom_Fonts } from "../../Constants/Font";
import { Constants } from "../../Constants/Constants";
import { Colors } from "../../Colors/Colors"; 0
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from "react-native-safe-area-context";
import { getServices, getEvents } from "../../apiSauce/HttpInteractor";
import { getDistance } from 'geolib';
import Toast from 'react-native-simple-toast';
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { refreshToken, getAllProviders } from "../../apiSauce/HttpInteractor";
import { SetToken, setLocation } from '../../Redux/userDetail'

import _ from 'lodash'
import Loader from "../../Components/loader";
const HomeTabScreen = ({ navigation }) => {
  const [serviceData, setServiceData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [providersData, setProvidersData] = useState([]);
  const auth = useSelector(state => state.userReducer.auth)
  const user = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()
  const [currentLatitude, setCurrentLatitude] = useState(37.785834)
  const [currentLongitude, setCurrentLongitude] = useState(-122.406417)
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    Geolocation.getCurrentPosition(location => {
      setCurrentLatitude(location.coords.latitude)
      setCurrentLongitude(location.coords.longitude)
      dispatch(setLocation({ lat: location.coords.latitude, lon: location.coords.longitude }))
    }, error => {
      const { code, message } = error;
      console.warn(code, message);
    })
    getServices().then(response => {
      setLoading(true)
      if (response.ok) {
        if (response.data?.status === true) {
          setLoading(false)
          setServiceData(response.data.data)
        }
        else {
          setLoading(false)
          Toast.show(response.data.message)
        }
      } else {
        setLoading(false)
        Toast.show(response.problem)
      }
    });


  if (auth) {
    refreshToken(user.userType, user._id).then(response => {
      setLoading(true)
      if (response.ok) {
        setLoading(false)
        if (response.data?.status === true) {
          dispatch(SetToken(response.data.data.token))
        }
        else {
          setLoading(false)
          Toast.show(response.data.message)
        }
      } else {
        setLoading(false)
        Toast.show(response.problem)
      }
    }).catch((error) => Toast.show(error.message));
  }

    getEvents().then(response => {
      setLoading(true)
      if (response.ok) {
        if (response.data?.status === true) {
          setLoading(false)
          setEventsData(response.data.data)
        }
        else {
          Toast.show(response.data.message)
          setLoading(false)
        }
      } else {
        Toast.show(response.problem)
        setLoading(false)
      }
    });

    getAllProviders(user._id).then(response => {
      setLoading(true)
      if (response.ok) {
        if (response.data?.status === true) {
          setLoading(false)
          setProvidersData(response.data.data)
        }
        else {
          setLoading(false)
          Toast.show(response.data.message)
        }
      } else {
        setLoading(false)
        Toast.show(response.problem)
      }
    });

  }, []);

  var PopularView = () => {
    return (
      <View>
        <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 25 }}>Featured Updoers</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={providersData}
          renderItem={PopularItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  const Item = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      let data = providersData.filter(provider => {
        if (provider?.services?.filter((service) => service.service_id._id === item._id).length > 0) {
          return true
        }
        return false
      })
      navigation.navigate('SearchResultScreen', { serviceName: item.service_name, data: data })
    }} >
      <Text style={styles.title}>{item.service_name}</Text>
      <Image style={{ marginEnd: 12, resizeMode: "contain", width: 50, height: 50 }} source={{ uri: Constants.IMG_BASE_URL + item.service_icon }} />
    </TouchableOpacity>
  );


  const PopularItem = ({ item, index }) => (

    <TouchableOpacity activeOpacity={0.8} onPress={() => {

      navigation.navigate('UpdoerProfile', { data: item })
    }} style={{ width: width * 0.8, backgroundColor: "white", borderRadius: 16, height: 360, margin: 16, shadowColor: "grey", shadowOpacity: 0.4, elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
      <ImageBackground style={{ height: 180, width: width * 0.8, resizeMode: "cover", borderTopEndRadius: 16, borderTopLeftRadius: 16 }} source={(item.profile_pic != "") ? { uri: Constants.IMG_BASE_URL + item.profile_pic } : require("../../assets/dummy.png")}>

      </ImageBackground>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 18 }}>{item.name}</Text>
      <FlatList
      style={{marginHorizontal: 12}}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={item.services}
        renderItem={ServiceView}
        numColumns={2}
        keyExtractor={item => item.service_id}
      />
      <View style={{ flexDirection: "row", alignContent: "center", width: width * 0.8, justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={{ width: 24, height: 24, resizeMode: "contain", marginLeft: 16, marginRight: 8 }} source={require("../../assets/navPin.png")} />
          <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 12 }}>{Math.round((getDistance(
            { latitude: currentLatitude, longitude: currentLongitude },
            { latitude: Number(item.address.lat), longitude: Number(item.address.lon) }
          ) / 1000) * 0.621371)} miles away</Text>
        </View>
        {/* <TouchableOpacity onPress={() => {
          auth ? saveProvider(item._id, token).then(response => {
            if (response.ok) {
              if (response.data?.status === true) {
                Toast.show(response.data.message)
                let dataC = _.cloneDeep(providersData)
                providersData[index].is_saved = response.data?.data?.is_saved
                setServiceData(dataC)
              }
              else {
                Toast.show(response.data.message)
              }
            } else {
              Toast.show(response.problem)
            }
          }) : null
        }} > */}
          <Image style={{ width: item.is_saved == 1 ? 60:80, height: item.is_saved == 1 ? 60:80, resizeMode: "contain", alignSelf: "flex-end",margin:item.is_saved == 1 ? 12:0 }} source={item.is_saved == 1 ? require("../../assets/sav.png") : require("../../assets/Save.png")} />
       
      </View>
    </TouchableOpacity>
  );

  return (

    <ScrollView
      style={{ width: "100%", height: "100%" }}
      horizontal={false}
      scrollEventThrottle={16}
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <HomeHeader navigation={navigation} />

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={serviceData}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
      <PopularView />
      <OccasionView data={eventsData} />
      <JoinView />
      <Invite navigation={navigation} />
      <ShopUpdoStore />
      <HowUpdoWorks navigation={navigation} />
      {loading && <Loader/>}
    </ScrollView>
  );
}

export default HomeTabScreen



const OccasionItem = ({ item }) => (
  <View style={{ height: 200, width: width * 0.5, backgroundColor: Colors.blueText, margin: 16, borderRadius: 12, shadowColor: "grey", shadowOpacity: 0.4, overflow: "hidden", elevation: 3, shadowOffset: { width: 0, height: 1 } }}>

    <Image style={{ resizeMode: "contain", height: 130, width: width * 0.5 }} source={require("../../assets/ring.png")} />
    <View style={{ backgroundColor: "white", height: 70 }}>
      <Text style={{ color: "black", alignSelf: "center", fontSize: 18, fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 20 }}>{item.event_name}</Text>
    </View>
  </View>
);



const HomeHeader = ({ navigation }) => {
  return (
    <ImageBackground style={{ width, height: height * 0.65, resizeMode: "stretch" }} source={require("../../assets/homeTop.png")}>
      <SafeAreaView>
        <View>
          <TouchableOpacity style={styles.pickerStyle} onPress={() => {
            navigation.navigate('SearchScreen')
          }} >
            <Image style={{ width: 24, height: 24 }} source={require("../../assets/searchBtn.png")} />
            <Text style={styles.pickerTitleStyle}>How do you Updo?</Text>

          </TouchableOpacity>

          <Text style={styles.boldTextStyle} >Updo{"\n"}Near You </Text>
          <TouchableOpacity style={styles.btnViewStyle} onPress={() => {
            //action
          }} >
            <Text style={styles.btnTitleStyle}>Explore nearby Updoers</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

var ServiceView = (data) => {
  return (
    <View style={{ height: 30, borderRadius: 15, borderColor: "black", borderWidth: 1, marginLeft:4,marginRight:8,marginVertical:8,alignItems: "center", justifyContent: "center" }}>
      <Text style={{ marginHorizontal: 16 }}>{data.item.service_id.service_name}</Text>
    </View>)
}

var OccasionView = ({ data }) => {
  return (
    <View style={{ width, height: height * 0.5, backgroundColor: "#FFBDCC", marginVertical: 20 }}>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 24, color: Colors.blueText }}>Style up for{"\n"}special occasion?</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={OccasionItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.btnExploreStyle} onPress={() => {
        //action
      }} >
        <Text style={styles.btnTitleStyle}>Explore all</Text>
      </TouchableOpacity>
    </View>)
}

const JoinView = () => {
  return (
    <ImageBackground style={{ width, height: height * 0.5, marginVertical: 20 }} source={require("../../assets/joinBg.png")}>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 22, color: Colors.blueText, alignSelf: "center" }}>Join the Updo Community!</Text>
      <Text style={{ marginLeft: 16, fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 15, color: Colors.blueText, alignSelf: "center" }}>Sign up to list your services!</Text>

      <TouchableOpacity style={{ height: 40, backgroundColor: Colors.pinkColor, width: "35%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: 20 }} onPress={() => {
        //action
      }} >
        <Text style={styles.btnTitleStyle}>Join Now</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const Invite = ({ navigation }) => {
  return (
    <ImageBackground style={{ width, height: height * 0.5, marginVertical: 20, justifyContent: "flex-end" }} source={require("../../assets/inviteBg.png")}>

      <TouchableOpacity style={{ height: 40, backgroundColor: "white", width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginBottom: 30 }} onPress={() => {
        navigation.navigate('InviteFriends')
      }} >
        <Text style={{
          alignSelf: "center",
          color: Colors.blueText,
          fontSize: 14,
          fontFamily: Custom_Fonts.Montserrat_SemiBold
        }}>Invite a Friend!</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const ShopUpdoStore = () => {
  return (
    <ImageBackground style={{ width, height: height * 0.5, marginVertical: 20 }} source={require("../../assets/shop.png")}>
      <TouchableOpacity style={{ height: 40, backgroundColor: "white", width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: 40 }} onPress={() => {
        //action
      }} >
        <Text style={{
          alignSelf: "center",
          color: Colors.blueText,
          fontSize: 14,
          fontFamily: Custom_Fonts.Montserrat_SemiBold
        }}>Shop the Updo Store</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const HowUpdoWorks = ({ navigation }) => {
  return (
    <ImageBackground style={{ width, height: height * 0.5, marginTop: 20, justifyContent: "flex-end", marginBottom: 60 }} source={require("../../assets/howWorks.png")}>

      <TouchableOpacity style={{ height: 40, backgroundColor: Colors.pinkColor, width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginBottom: 120 }} onPress={() => {
        navigation.navigate('HowUpdoWorks')
      }} >
        <Text style={styles.btnTitleStyle}>How Updo Works</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({

  pickerStyle: {
    width: "90%",
    flexDirection: "row",
    height: 50,
    marginTop: 20,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  pickerTitleStyle: {
    color: "black",
    fontSize: 15,
    fontFamily: Custom_Fonts.Montserrat_Regular,
    marginLeft: 16,
  },
  boldTextStyle: {
    color: "white",
    fontSize: 30,
    fontFamily: Custom_Fonts.Montserrat_Black,
    margin: 16

  },
  btnViewStyle: {
    width: "55%",
    height: 32,
    backgroundColor: Colors.themeBlue,
    marginLeft: 12,
    borderRadius: 25,
    justifyContent: "center"
  },
  btnExploreStyle: {
    width: "35%",
    height: 32,
    backgroundColor: Colors.themeBlue,
    marginLeft: 12,
    borderRadius: 25,
    justifyContent: "center",
    marginBottom: 20
  }
  ,
  btnTitleStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    fontFamily: Custom_Fonts.Montserrat_SemiBold
  },
  ratingViewStyle: {
    width: "35%",
    height: 32,
    backgroundColor: Colors.themeBlue,
    marginLeft: 12,
    borderRadius: 25,
    marginTop: 16,
    justifyContent: "center"
  },
  item: {
    backgroundColor: Colors.blueText,
    padding: 12,
    marginVertical: 20,
    marginHorizontal: 8,
    minWidth: 150,
    height: 80,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 28,
    marginEnd: 16,
    color: "white",
    fontFamily: Custom_Fonts.Montserrat_Bold
  },

});
