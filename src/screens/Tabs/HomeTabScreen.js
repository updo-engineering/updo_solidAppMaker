import React, { useEffect, useState } from "react";
import { Text, ScrollView, Dimensions, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Linking } from "react-native";
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
  const [serviceData1, setServiceData1] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [eventsData1, setEventsData1] = useState([]);
  const [providersData, setProvidersData] = useState([]);
  const auth = useSelector(state => state.userReducer.auth)
  const user = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const DATA = [0.13, 0.25, 0.37, 0.50, 0.62, 0.75, 0.88, 1];
  const FOLLOWDATA = [require('../../assets/instaIcon.png'), require('../../assets/facebook.png'), require('../../assets/twitterIcon.png'), require('../../assets/spotifyIcon.png'), require('../../assets/youtubeIcon.png'), require('../../assets/linkedin.png')];
  const PODCASTDATA = [require('../../assets/podCast.png'), require('../../assets/journal.png'), require('../../assets/store.png')];

  useEffect(() => {
    if (serviceData.length > 0) {
      let d = [...serviceData]
      const z = []
      while (d.length) z.push(d.splice(0, 2))
      setServiceData1(z)
    }
  }, [serviceData])

  useEffect(() => {
    if (eventsData.length > 0) {
      let d = [...eventsData]
      const z = []
      while (d.length) z.push(d.splice(0, 2))
      setEventsData1(z)
    }
  }, [eventsData])

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
          let a = response.data.data.filter((data) => data.is_conn_active == 1)
          setProvidersData(a)
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
      <TouchableOpacity style={{ width: 80, height: 70, backgroundColor: Colors.blueText, borderRadius: 8, marginLeft: 15, justifyContent: "center" }}
        onPress={() => {
          switch (index) {
            case 0:
              Linking.openURL('https://www.instagram.com/gotiptop/')
              break;
            case 1:
              Linking.openURL('https://www.facebook.com/TipTop-102336421590302/')
              break;
            case 2:
              Linking.openURL('https://twitter.com/go_tiptop')
              break;
            case 3:
              Linking.openURL('https://open.spotify.com/show/6ljisqNju1oSfl1lo9y0ah?si=508ef25154254ee9')
              break;
            case 4:

              break;
            case 5:
              Linking.openURL('https://www.linkedin.com/company/jointiptop')
              break;
            default:
              break;
          }
        }}

      >
        <Image style={{ width: 48, height: 48, alignSelf: "center", resizeMode: "contain" }} source={item} />
      </TouchableOpacity>
    );
  }

  const HomeHeader = ({ navigation }) => {
    return (
      <ImageBackground style={{ width, height: height * 0.6, resizeMode: "stretch" }} source={require("../../assets/homeTop.png")}>
        <SafeAreaView>
          <View>
            <TouchableOpacity style={styles.pickerStyle} onPress={() => {
              navigation.navigate('SearchScreen', { providers: providersData })
            }} >
              <Image style={{ width: 18, height: 18, resizeMode: "contain", marginHorizontal: 25 }} source={require("../../assets/searchBtn.png")} />
              <Text style={styles.pickerTitleStyle}>How do you TipTop?</Text>

            </TouchableOpacity>

            <Text style={{ alignSelf: "center", fontSize: 36, fontFamily: Custom_Fonts.Montserrat_Bold, marginTop: 75, color: 'white' }} >TipTop</Text>
            <Text style={{ alignSelf: "center", fontSize: 16, fontFamily: Custom_Fonts.Montserrat_SemiBold, marginTop: 36, color: 'white' }} >n. the highest point of excellence</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }

  const podCastItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ height: 180, width: 220, marginLeft: 8, marginRight: index == 2 ? 8 : 0 }} onPress={() => {
        index == 0 ?
          navigation.navigate('TipTopPodcast') : index == 1 ? Linking.openURL('https://www.jointiptop.com/journal') : Linking.openURL('https://www.jointiptop.com/community#')
      }} >
        <Image source={item} style={{ height: 180, width: '100%', resizeMode: "contain" }} />
      </TouchableOpacity>
    );
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

  const ProgressItem = ({ item, index }) => {
    return (
      <View style={{ borderColor: 'rgba(196, 196, 196,0.2)', borderWidth: 1, width: (width * 0.75) / 8.12, height: 60, backgroundColor: index < user.rewards ? '#00A8E0' : null, opacity: item, borderBottomLeftRadius: index == 0 ? 3 : 0, borderTopLeftRadius: index == 0 ? 3 : 0 }} />
    );
  }


  const OccasionItem = ({ item }) => {
    return (
      <View>{item.map(x => (
        <TouchableOpacity onPress={() => {
          if ((providersData?.length ?? 0) > 0) {
            let data = providersData.filter(provider => {
              if (provider?.events?.filter((event) => event === x.event_name).length > 0) {
                return true
              }
              return false
            })
            if ((data?.length ?? 0) > 0) {
              navigation.navigate('SearchResultScreen', { serviceName: x.event_name, data: data })
            }
            else {
              Toast.show('No Services Provider found for ' + x.event_name + ' Event')
            }
          }
          else {
            Toast.show('No Services Provider found for ' + x.event_name + ' Event')
          }
        }}>
          <View style={{ height: 150, width: width * 0.52, backgroundColor: Colors.blueText, margin: 16, borderRadius: 8, shadowColor: "grey", shadowOpacity: 0.4, overflow: "hidden", elevation: 3, shadowOffset: { width: 0, height: 1 } }}>
          </View>
          <Text style={{ color: "black", alignSelf: "center", fontSize: 17, fontFamily: Custom_Fonts.Montserrat_SemiBold }}>{x.event_name}</Text>
        </TouchableOpacity>
      ))}
      </View>
    );
  }

  const Item = ({ item }) => {
    return (
      <View>{item.map(x => (
        <TouchableOpacity style={styles.item} onPress={() => {
          if ((providersData?.length ?? 0) > 0) {
            let data = providersData.filter(provider => {
              if (provider?.services?.filter((service) => service.service_id._id === x._id).length > 0) {
                return true
              }
              return false
            })
            if ((data?.length ?? 0) > 0) {
              navigation.navigate('SearchResultScreen', { serviceName: x.service_name, data: data })
            }
            else {
              Toast.show('No Services Provider found for ' + x.service_name + ' Service')
            }
          }
          else {
            Toast.show('No Services Provider found for ' + x.service_name + ' Service')
          }
        }}
        >
          <Text style={styles.title}>{x.service_name}</Text>
        </TouchableOpacity>
      ))}
      </View>
    );
  }

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
        style={{ marginLeft: 7 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={serviceData1}
        renderItem={Item}
        keyExtractor={item => item.id}
      />

      <OccasionView data={eventsData1} />



      <JoinView />



      <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 22, color: 'black', marginVertical: 12, marginLeft: 15 }}>We’re all tiptop</Text>
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

      <ScrollView
        style={{ width: '100%', height: 360 }}
        horizontal={true}
        scrollEventThrottle={16}
        bounces={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <ImageBackground style={{ height: 360, resizeMode: 'cover' }} source={require("../../assets/rectBottom.png")}>
          <View style={{ flexDirection: "row", marginTop: 16 }}>

            {user.user_type == 'Customer' ?

              <View style={{ width: width * 0.8, height: 360, marginHorizontal: 8 }}>
                <Text style={{ color: "black", fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Bold, margin: 16 }}>For Clients</Text>
                <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
                <TouchableOpacity onPress={() => {
                  navigation.navigate('HelpScreen')
                }} >
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>FAQ</Text>
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>Here to answer your questions</Text>
                  <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('ReferServiceProvider')
                }} >
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>Refer a Service Provider</Text>
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>Grow the TipTop Community</Text>
                  <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('GiveUsFeedback')
                }} >
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>Help Center</Text>
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>Get support</Text>
                  <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('LearnMore')
                }} >
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>Caretakers & Administrative Professionals</Text>
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>TipTop for all</Text>
                </TouchableOpacity>
              </View>
              :

              <View style={{ width: width * 0.8, height: 360, marginHorizontal: 8 }}>
                <Text style={{ color: "black", fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Bold, margin: 16 }}>For TipToppers</Text>
                <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
                <TouchableOpacity onPress={() => {

                }} >
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>FAQ</Text>
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>Here to answer your questions</Text>
                  <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {

                }} >
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>Grow your Brand</Text>
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>Join the TipTop Podcast </Text>
                  <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {

                }} >
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>List Your Services</Text>
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 12 }}>Join our growing community of TipToppers</Text>
                  <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {

                }} >
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>Give us Feedback</Text>
                  <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>We want to hear from you</Text>
                </TouchableOpacity>
              </View>
            }
            <View style={{ width: width * 0.8, height: 360, marginHorizontal: 8 }}>
              <Text style={{ color: "black", fontSize: 15, fontFamily: Custom_Fonts.Montserrat_Bold, margin: 16 }}>More</Text>
              <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />

              <TouchableOpacity onPress={() => {
                  navigation.navigate('FollowTipTop')
              }} >
                <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>TipTop News</Text>
                <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>Stay up to date on all-things TipTop!</Text>
                <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                  navigation.navigate('HelpUsGrow')
              }} >
                <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>Bring TipTop to Your City</Text>
                <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>Where should we go next?</Text>
                <View style={{ width: '100%', height: 0.6, backgroundColor: 'black' }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                  navigation.navigate('PartnerWithUs')
              }} >
                <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Bold, marginHorizontal: 16, marginTop: 12 }}>Partner with Us</Text>
                <Text style={{ color: "black", fontSize: 12, fontFamily: Custom_Fonts.Montserrat_Regular, marginBottom: 8, marginHorizontal: 16 }}>Let’s Connect</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ImageBackground>
      </ScrollView>

      <View>
      </View>

      {loading && <Loader />}
    </ScrollView>
  );
}

export default HomeTabScreen


const JoinView = () => {
  return (
    <View style={{ marginHorizontal: 15, marginTop: 40, marginBottom: 20, backgroundColor: Colors.blueText, borderRadius: 12, overflow: 'hidden' }}>
      <Text style={{ marginLeft: 16, marginTop: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 21, color: 'white', alignSelf: "center" }}>Dream big. Start small.</Text>
      <Text style={{ marginLeft: 16, fontFamily: Custom_Fonts.ITALIC, fontSize: 15, color: 'white', alignSelf: "center", fontSize: 21 }}>Above all, start.</Text>

      <TouchableOpacity style={{ height: 40, backgroundColor: 'white', width: "50%", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: 20 }} onPress={() => {
        //action
      }} >
        <Text style={[styles.btnTitleStyle, { color: Colors.blueText }]}>List My Services</Text>
      </TouchableOpacity>
      <Image source={require('../../assets/joinBg.png')} style={{ width: '100%', height: 300, resizeMode: "stretch", marginTop: 25 }} />
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
    <View style={{ width: width * 0.92, height: height * 0.5, marginTop: 20, justifyContent: "flex-end", marginBottom: 40, alignSelf: "center", borderRadius: 12, overflow: 'hidden' }}>
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
    marginVertical: 12,
    marginLeft: 8,
    marginRight: 8,
    height: 72,
    minWidth: 137,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    color: "white",
    fontFamily: Custom_Fonts.Montserrat_SemiBold
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
