import React, { useEffect, useState } from "react";
import { Text, ScrollView, Dimensions, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
const { width, height } = Dimensions.get('window');
import { Custom_Fonts } from "../../Constants/Font";
import { Colors } from "../../Colors/Colors"; 0
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from "react-native-safe-area-context";
import { getServices, getEvents } from "../../apiSauce/HttpInteractor";
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
  const [loading, setLoading] = useState(false)
  const DATA = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const FOLLOWDATA = [require('../../assets/instaIcon.png'), require('../../assets/facebook.png'), require('../../assets/twitterIcon.png'), require('../../assets/spotifyIcon.png'), require('../../assets/youtubeIcon.png'), require('../../assets/linkedin.png')];
  const PODCASTDATA = [require('../../assets/podCast.png'), require('../../assets/journal.png'), require('../../assets/store.png')];


  useEffect(() => {
  
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
      refreshToken(user.user_type, user._id).then(response => {
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



  const FollowItem = ({ item, index }) => {
    return (
      <View style={{ width: 80, height: 70, backgroundColor: Colors.blueText, borderRadius: 8, marginLeft: 15, justifyContent: "center" }} >
        <Image style={{ width: 48, height: 48, alignSelf: "center", resizeMode: "contain" }} source={item} />
      </View>
    );
  }

  const podCastItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ height: 180, width: 220, marginLeft: 8, marginRight: index == 2 ? 8 : 0 }} onPress={() => {
        navigation.navigate('TipTopPodcast')
      }} >
        <Image source={item} style={{ height: 180, width: '100%', resizeMode: "contain" }} />
      </TouchableOpacity>
    );
  }

  const ProgressItem = ({ item, index }) => {
    return (
      <View style={{ borderColor: "grey", borderLeftWidth: 0.2, borderTopWidth: 0.2, width: (width * 0.75) / 8, height: 60, backgroundColor: '#00A8E0', opacity: item, borderBottomLeftRadius: index == 0 ? 3 : 0, borderTopLeftRadius: index == 0 ? 3 : 0 }} />
    );
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
      <View style={{ width: '92%', alignSelf: "center", backgroundColor: Colors.blueText, borderRadius: 12, marginVertical: 20 }} >
        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 18, alignSelf: "center", color: 'white', marginVertical: 12 }}>My TipTop Rewards</Text>
        <View style={{ height: 80, backgroundColor: 'white', borderRadius: 12, marginHorizontal: 6, marginBottom: 12, justifyContent: "center" }}>
          <View style={{ height: 60, width: '100%', overflow: 'hidden', flexDirection: 'row', marginBottom: 3 }}>
            <FlatList
              style={{ marginLeft: 8 }}
              horizontal={true}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              data={DATA}
              renderItem={ProgressItem}
              keyExtractor={item => item.id}
            />

            <View style={{ width: (width * 0.8) / 8, borderColor: '#03409D', borderWidth: 2, height: 60, justifyContent: "center", alignItems: "center", marginRight: 8, borderBottomRightRadius: 3, borderTopRightRadius: 3 }}>
              <Image source={require('../../assets/logoSmall.png')} style={{ height: 21, width: 24 }} />
            </View>
          </View>
        </View>

      </View>
      <Text style={{ fontSize: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 8, color: 'black', marginLeft: 15 }} >Explore Services</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={serviceData}
        renderItem={Item}
        keyExtractor={item => item.id}
      />

      <OccasionView data={eventsData} />



      <JoinView />



      <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 22, color: 'black', marginVertical: 12, marginLeft: 8 }}>We’re all tiptop</Text>
      <FlatList
        horizontal={true}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={PODCASTDATA}
        renderItem={podCastItem}
        keyExtractor={item => item.id}
      />

      <FlatList
        style={{ marginVertical: 20 }}
        horizontal={true}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={FOLLOWDATA}
        renderItem={FollowItem}
        keyExtractor={item => item.id}
      />


      <Invite navigation={navigation} />

      <View style={{ marginHorizontal: 15, backgroundColor: Colors.blueText, borderRadius: 12 }}>
        <Text style={{ color: "white", alignSelf: "center", fontSize: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, margin: 16, textAlign: "center" }}>TipTop for Caretakers and Administrative Professionals</Text>
        <Image style={{ width: 150, height: 100, alignSelf: "center", marginVertical: 15, resizeMode: 'contain' }} source={require("../../assets/handShake.png")} />
        <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: 'white', width: '50%', height: 44, marginVertical: 15, alignSelf: "center" }]} onPress={() => {
          navigation.navigate('LearnMore')
        }} >
          <Text style={[styles.btnTitleStyle, { color: Colors.blueText, fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Learn More</Text>
        </TouchableOpacity>
      </View>

      <HowUpdoWorks navigation={navigation} />

      <View>
      </View>

      {loading && <Loader />}
    </ScrollView>
  );
}

export default HomeTabScreen



const OccasionItem = ({ item }) => (
  <View>
    <View style={{ height: 150, width: width * 0.52, backgroundColor: Colors.blueText, margin: 16, borderRadius: 12, shadowColor: "grey", shadowOpacity: 0.4, overflow: "hidden", elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
    </View>
    <Text style={{ color: "black", alignSelf: "center", fontSize: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold }}>{item.event_name}</Text>
  </View>
);



const HomeHeader = ({ navigation }) => {
  return (
    <ImageBackground style={{ width, height: height * 0.6, resizeMode: "stretch" }} source={require("../../assets/homeTop.png")}>
      <SafeAreaView>
        <View>
          <TouchableOpacity style={styles.pickerStyle} onPress={() => {
            navigation.navigate('SearchScreen')
          }} >
            <Image style={{ width: 18, height: 18, resizeMode: "contain", marginHorizontal: 25 }} source={require("../../assets/searchBtn.png")} />
            <Text style={styles.pickerTitleStyle}>How do you Updo?</Text>

          </TouchableOpacity>

          <Text style={{ alignSelf: "center", fontSize: 36, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 75, color: 'white' }} >TipTop</Text>
          <Text style={{ alignSelf: "center", fontSize: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 36, color: 'white' }} >n. the highest point of excellence</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

var OccasionView = ({ data }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 8, color: 'black', marginLeft: 15 }} >Explore Occassions</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={OccasionItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const JoinView = () => {
  return (
    <View style={{ marginHorizontal: 15, marginVertical: 20, backgroundColor: Colors.blueText, borderRadius: 12, overflow: 'hidden' }}>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 21, color: 'white', alignSelf: "center" }}>Dream big. Start small.</Text>
      <Text style={{ marginLeft: 16, fontFamily: Custom_Fonts.ITALIC, fontSize: 15, color: 'white', alignSelf: "center", fontSize: 21 }}>Above all, start.</Text>

      <TouchableOpacity style={{ height: 40, backgroundColor: 'white', width: "50%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: 20 }} onPress={() => {
        //action
      }} >
        <Text style={[styles.btnTitleStyle, { color: Colors.blueText }]}>List My Services</Text>
      </TouchableOpacity>
      <Image source={require('../../assets/joinBg.png')} style={{ width: '100%', height: 260, resizeMode: "cover", marginTop: 25 }} />
    </View>
  )
}

const Invite = ({ navigation }) => {
  return (
    <View style={styles.itemViewStyle}>
      <Image style={{ alignSelf: 'center', width: 280, height: 360 }} source={require("../../assets/invite.png")} />
      <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: 'white', width: '50%', marginTop: -60, height: 44, marginBottom: 20 }]} onPress={() => {
        navigation.navigate('InviteFriends')
      }} >
        <Text style={[styles.btnTitleStyle, { color: Colors.blueText, fontFamily: Custom_Fonts.Montserrat_SemiBold }]}>Invite a Friend</Text>
      </TouchableOpacity>
    </View>
  )
}


const HowUpdoWorks = ({ navigation }) => {
  return (
    <View style={{ width: width * 0.92, height: height * 0.5, marginTop: 20, justifyContent: "flex-end", marginBottom: 60, alignSelf: "center", borderRadius: 12, overflow: 'hidden' }}>
      <ImageBackground style={{ height: height * 0.5, justifyContent: "flex-end" }} source={require("../../assets/howWorks.png")}>

        <TouchableOpacity style={{ height: 40, backgroundColor: 'white', width: "65%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginBottom: 20 }} onPress={() => {
          navigation.navigate('HowUpdoWorks')
        }} >
          <Text style={[styles.btnTitleStyle, { color: Colors.blueText }]}>How TipTop Works</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
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
    alignItems: "center",
    alignSelf: "center",
  },
  pickerTitleStyle: {
    color: "black",
    fontSize: 15,
    fontFamily: Custom_Fonts.Montserrat_Medium,
    marginLeft: 28,
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
    marginLeft: 15,
    height: 72,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    color: "white",
    fontFamily: Custom_Fonts.Montserrat_Medium
  },
  itemViewStyle: {
    width: "92%",
    backgroundColor: Colors.blueText,
    alignItems: "center",
    borderRadius: 16,
    marginVertical: 25,
    marginHorizontal: 16,
    shadowColor: "grey",
    shadowOpacity: 0.4,
    elevation: 3,
    overflow: "hidden",
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 1 }
  },

});
