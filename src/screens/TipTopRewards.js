import React, { useState,useEffect } from "react";
import { Text, SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, Linking } from "react-native";
import { Custom_Fonts } from "../Constants/Font";
import { Colors } from "../Colors/Colors";
const { width, height } = Dimensions.get('window');
import { useSelector,useDispatch } from "react-redux"
import { getDetail,claimReward } from "../apiSauce/HttpInteractor";
import Loader from '../Components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetUser,SetToken } from '../Redux/userDetail'

const TipTopRewards = (props) => {
    const DATA = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    const ref = useSelector(state => state.userReducer.ref)
    
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userData,setUserData] = useState(user)
    const [rewardData,setRewardData] = useState()
    const dispatch = useDispatch()

    const ProgressItem = ({ item, index }) => {
        return (
            <View style={{ borderColor: "grey", marginLeft: 0.5, borderWidth: 0.27, width: (width * 0.75) / 7.91, height: 50, backgroundColor: index < userData.rewards ? userData.rewards >= 9 ? '#34C546' : '#00A8E0' : null, opacity: item, borderBottomLeftRadius: index == 0 ? 3 : 0, borderTopLeftRadius: index == 0 ? 3 : 0 }} />
        );
    }

    const storeData = async value => {
        setLoading(true);
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('UserDetail', jsonValue);
          dispatch(SetToken(value.token));
          dispatch(SetUser(value.user));
        } catch (e) {
          Toast.show('Something Went Wrong Please Try Again Later');
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        setLoading(true);
        getDetail(user.user_type,token).then(response => {
            if (response.ok) {
                setLoading(false);
                if (response.data?.status === true) {
                    setUserData(response.data?.data)
                    setRewardData(response.data?.data?.reward_data)
                    storeData({ref: ref,user: response.data?.data,token:token})
                }
                else {
                    Toast.show(response.data.message)
                }
            } else {
                setLoading(false);
                Toast.show(response.problem)
            }
        });
    }, []);

    return (
        <ScrollView
            style={{ width: "100%", height: "100%", backgroundColor: 'white' }}
            horizontal={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {isSubmitted ? <View><View style={{
                backgroundColor: 'white', width: "92%", alignSelf: 'center', elevation: 4, borderRadius: 12, marginBottom: 20, shadowColor: "grey",
                shadowOpacity: 0.5,marginTop: 120,
                shadowOffset: { width: 2, height: 5 }, shadowColor: "grey"
            }} >
                <Image style={{ alignSelf: 'center', width: 130, height: 130, resizeMode: 'cover', marginTop: 8 }} source={require('../assets/logoGreen.png')} />
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, color: "black", fontSize: 16, alignSelf: "center", marginTop: -25 }}>Congratulations!</Text>
                <Text style={{ fontFamily: Custom_Fonts.Montserrat_Medium, color: "black", fontSize: 14, alignSelf: "center", marginVertical: 40, marginHorizontal: 25, textAlign: 'center' }}>Winning feels great, doesn’t it?{'\n\n'}The TipTop Team will be in touch shortly with your reward!</Text>
            </View>
                <TouchableOpacity style={[styles.btnViewStyle, { width: '90%', height: 50, marginTop: 60, alignSelf: 'center', borderRadius: 25,backgroundColor:'#34C546' }]} onPress={() => {
                    props.navigation.replace('FollowTipTop')
                }} >
                    <Text style={[styles.btnTitleStyle, { fontFamily: Custom_Fonts.Montserrat_Medium, fontSize: 16 }]}>{'Follow TipTop'}</Text>
                </TouchableOpacity>
            </View>
                :
                <SafeAreaView>
                    <View style={{ flexDirection: "row", marginBottom: 12, marginTop: 20 }}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack();
                        }} >
                            <Image style={{ width: 16, height: 16, resizeMode: "contain", marginTop: 20, marginHorizontal: 12 }} source={require("../assets/backBtn.png")} />
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 20, alignSelf: "center", width: '80%', textAlign: "center", color: Colors.blueText }}>My TipTop Rewards</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: Colors.blueText }} />

                    <Text style={{ marginVertical: 20, fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 20, alignSelf: "center", textAlign: "center", color: Colors.blueText }}>TipTop Rewards Dashboard</Text>

                    <View style={{ height: 50, width: '100%', overflow: 'hidden', flexDirection: 'row', marginBottom: 3 }}>

                        <FlatList
                            style={{ marginLeft: 4 }}
                            horizontal={true}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            data={DATA}
                            renderItem={ProgressItem}
                            keyExtractor={item => item.id}
                        />
                        <View style={{ width: 80, backgroundColor: userData.rewards >= 9 ? '#34C546' : null, borderColor: '#03409D', borderWidth: userData.rewards >= 9 ? 0 : 2, height: 50, justifyContent: "center", alignItems: "center", marginRight: 4, borderBottomRightRadius: 3, borderTopRightRadius: 3 }}>
                            <Image source={require('../assets/logoSmall.png')} style={{ height: 21, width: 24, tintColor: userData.rewards >= 9 ? 'white' : null }} />
                        </View>
                    </View>

                    {userData.rewards >= 9 ? <TouchableOpacity style={[styles.btnViewStyle, { backgroundColor: '#34C546' }]} onPress={() => {
                        claimReward(userData.user_type, userData._id).then(response => {
                            if (response.ok) {
                                setLoading(false);
                                if (response.data?.status === true) {
                                    setIsSubmitted(true)
                                }
                                else {
                                    Toast.show(response.data.message)
                                }
                            } else {
                                setLoading(false);
                                Toast.show(response.problem)
                            }
                        });
                    }} >
                        <Text style={styles.btnTitleStyle}>Claim Reward</Text>
                    </TouchableOpacity> : null}

                    <View style={{ flexDirection: "row", alignSelf: "center", height: 100, marginTop: 20 }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Total TipTops</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>{rewardData?.tiptops}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#C4C4C4', height: 60, alignSelf: "center" }} />
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Reviews Given</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>{rewardData?.review_given}</Text>
                        </View>
                    </View>

                    <View style={{ width: '60%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4' }} />

                    <View style={{ flexDirection: "row", alignSelf: "center", height: 100, marginTop: 20 }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Referrals Accepted</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>{rewardData?.refers}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#C4C4C4', height: 60, alignSelf: "center" }} />
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Invitations Accepted</Text>
                            <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 15, alignSelf: "center", marginTop: 4, color: Colors.blueText }}>{rewardData?.invites}</Text>
                        </View>
                    </View>
                    <View style={{ width: '60%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4' }} />
                    <View style={{ flexDirection: "row", alignSelf: "center", height: 80, justifyContent: 'space-between', width: '35%' }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>Total</Text>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_Bold, fontSize: 15, alignSelf: "center", marginTop: 12, color: Colors.blueText }}>{rewardData?.tiptops+rewardData?.review_given+rewardData?.refers+rewardData?.invites}</Text>

                    </View>
                    <View style={{ width: '60%', alignSelf: "center", height: 1, backgroundColor: '#C4C4C4' }} />
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 21, margin: 20, color: Colors.blueText }}>How it works</Text>
                    <Text style={{ fontFamily: Custom_Fonts.Montserrat_Regular, fontSize: 14, marginHorizontal: 20, color: 'black' }}>The team at TipTop is excited to introduce our TipTop Rewards program!{'\n\n'}
                        You are empowered to earn points by being an active member of TipTop, from enjoying services to referring future TipToppers.{'\n\n'}
                        Rewards include discounts, free services, and other other bonuses to help you maximize your TipTop experience.{'\n\n'}
                        Stack up points and claim your reward now!</Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('InviteFriends')
                    }}
                        style={{ paddingVertical: 20, borderColor: '#C4C4C4', borderTopWidth: 1, borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 25, marginHorizontal: 20 }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, color: Colors.blueText }}>Invite friends to TipTop</Text>
                        <Image style={{ resizeMode: "contain", width: 16, height: 16, alignSelf: "center" }} source={require("../assets/rightArrow.png")}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('ReferServiceProvider')
                    }}
                        style={{ paddingVertical: 20, borderColor: '#C4C4C4', borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, color: Colors.blueText }}>Refer your favorite service providers</Text>
                        <Image style={{ resizeMode: "contain", width: 16, height: 16, alignSelf: "center" }} source={require("../assets/rightArrow.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL('https://www.jointiptop.com')
                    }}
                        style={{ paddingVertical: 20, borderColor: '#C4C4C4', borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, color: Colors.blueText }}>Explore the TipTop Store</Text>
                        <Image style={{ resizeMode: "contain", width: 16, height: 16, alignSelf: "center" }} source={require("../assets/rightArrow.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('FollowTipTop')
                    }}
                        style={{ paddingVertical: 20, borderColor: '#C4C4C4', borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                        <Text style={{ fontFamily: Custom_Fonts.Montserrat_SemiBold, fontSize: 17, color: Colors.blueText }}>Follow TipTop</Text>
                        <Image style={{ resizeMode: "contain", width: 16, height: 16, alignSelf: "center" }} source={require("../assets/rightArrow.png")}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnViewStyle, { marginVertical: 32 }]} onPress={() => {
                         navigation.goBack()
                         navigation.navigate('HomeTabScreen');

                    }} >
                        <Text style={styles.btnTitleStyle}>Explore TipTop</Text>
                    </TouchableOpacity>

                </SafeAreaView>
                
            }
             {loading && <Loader />}
        </ScrollView>

    );
}

export default TipTopRewards

const styles = StyleSheet.create({
    btnViewStyle: {
        width: "90%",
        flexDirection: "row",
        height: 50,
        backgroundColor: Colors.themeBlue,
        marginHorizontal: 18,
        marginVertical: 20,
        borderRadius: 25,
        justifyContent: "center", elevation: 6,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 1 }, shadowColor: "grey"
    },
    btnTitleStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontFamily: Custom_Fonts.Montserrat_Medium
    }
});
